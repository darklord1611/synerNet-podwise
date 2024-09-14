from scipy.signal import find_peaks
import json
import os
from pydantic import BaseModel, ValidationError
from typing import List, Dict, Any, Optional, Tuple
import argparse
import torch
from transformers import LongformerTokenizer, LongformerForSequenceClassification, Trainer, TrainingArguments
from datasets import load_metric
from torch.utils.data import Dataset
from torch.utils.data import DataLoader
import torch.optim as optim
import torch.nn.functional as F
import json
from sklearn.model_selection import train_test_split
import numpy as np
import requests
from openai import OpenAI
import pandas as pd
import csv
import torch.nn.functional as F
import torch.nn as nn
from tqdm import tqdm
import sys
from transformers import AutoTokenizer, AutoModel
from torch.optim.lr_scheduler import ReduceLROnPlateau
import matplotlib.pyplot as plt
import spacy
from sklearn.cluster import DBSCAN
from schemas import Transcript, Sentence, Utterance

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')


def sigmoid(x: float) -> float:
    """Calculate the sigmoid function."""
    return 1 / (1 + np.exp(-x))

def create_list_sentences(input_data: Transcript):
    sentences = []
    for utterance in input_data.utterances:
        for sentence in utterance.transcript:
            sentences.append(sentence.text)
    return sentences

def calculate_min_chunk_size(total_sentences: int) -> int:
    """Calculate the minimum chunk size using the given formula."""
    f_x = sigmoid(total_sentences) - 0.5  # Apply sigmoid and adjust by -0.5
    min_chunk_size = (1 / 5) * ((total_sentences / 20) ** (1 + f_x ** 2))
    return max(1, int(min_chunk_size))  # Ensure at least 1 sentence in the chunk

def mean_pooling(token_embeddings, attention_mask):
    """Apply mean pooling to get sentence embedding from token embeddings."""
    input_mask_expanded = attention_mask.unsqueeze(-1).expand(token_embeddings.size()).float()
    return torch.sum(token_embeddings * input_mask_expanded, 1) / torch.clamp(input_mask_expanded.sum(1), min=1e-9)

def get_token_embeddings(text: str, tokenizer, model, device):
    """
    Get the embeddings of tokens in a concatenated text, and return token embeddings along with attention mask.
    """
    encoded_input = tokenizer(text, padding=True, truncation=True, return_tensors='pt').to(device)
    model.to(device)
    with torch.no_grad():
        model_output = model(**encoded_input)

    return model_output[0], encoded_input['attention_mask'], encoded_input['input_ids']

def get_sentence_embeddings(text: str, sentences: list[str], tokenizer, model, device) -> list[list[float]]:
    """
    Calculate sentence embeddings using mean pooling over token embeddings for each sentence.
    Text is the concatenated form of all sentences.
    """
    token_embeddings, attention_mask, input_ids = get_token_embeddings(text, tokenizer, model, device)

    sentence_embeddings = []

    encoded_sentences = tokenizer(sentences, add_special_tokens=False, return_tensors='pt', padding=True, truncation=True).to(device)
    sentence_tokens = encoded_sentences['input_ids']

    token_idx = 0
    for sentence_token_ids in sentence_tokens:
        sentence_len = (sentence_token_ids != tokenizer.pad_token_id).sum().item()
        sentence_embedding = mean_pooling(token_embeddings[:, token_idx:token_idx + sentence_len, :], attention_mask[:, token_idx:token_idx + sentence_len])
        sentence_embeddings.append(sentence_embedding.squeeze().cpu().numpy())
        token_idx += sentence_len

    return sentence_embeddings

def cosine_similarity(vec1: list[float], vec2: list[float]) -> float:
    """Compute cosine similarity between two vectors."""
    vec1_np = np.array(vec1)
    vec2_np = np.array(vec2)
    dot_product = np.dot(vec1_np, vec2_np)
    magnitude1 = np.linalg.norm(vec1_np)
    magnitude2 = np.linalg.norm(vec2_np)

    if magnitude1 == 0 or magnitude2 == 0:
        return 0.0

    return dot_product / (magnitude1 * magnitude2)

def modified_divergence_half(embeddings1: list[list[float]], embeddings2: list[list[float]], mid_embedding: list[float]) -> float:
    """Calculate divergence using a weighted combination of original divergence."""
    divergences = []
    for emb1 in embeddings1:
        if embeddings2:
            max_cos_sim = max(cosine_similarity(emb1, emb2) for emb2 in embeddings2)
        else:
            max_cos_sim = 0
        divergence = 1 - max_cos_sim
        divergences.append(divergence)
    
    mean_divergence = np.mean(divergences) if divergences else 0.0
    return mean_divergence

def dynamic_window_adjustment(divergences, base_step=1, adjustment_factor=2):
    steps = [base_step] * len(divergences)
    for i in range(1, len(divergences)):
        if divergences[i] > divergences[i-1]:
            steps[i] = steps[i-1] * adjustment_factor  # Increase step size for higher divergence
        else:
            steps[i] = base_step  # Reset step size
    return steps

def semantic_splitter_colbert_modified(sentences: list[str], tokenizer, model, device, window_size: int = 16, global_window_size: int = 200, sliding_step: int = 1, percentile_threshold: int = 92) -> list[tuple[int, str]]:
    """
    Perform semantic splitting of text into chunks based on divergence. It uses modified divergence calculation, 
    enforces a minimum chunk size, and applies global windows around local windows for better context.
    
    Args:
    sentences (list[str]): List of sentences in the text to be processed.
    tokenizer: Tokenizer used for encoding sentences.
    model: Pre-trained model used for obtaining sentence embeddings.
    device: Device to run computations on.
    window_size (int): The number of sentences in the local window.
    global_window_size (int): The number of sentences in the global window.
    sliding_step (int): How far the local window moves (in terms of sentences) after each iteration.
    percentile_threshold (int): The percentile used to determine split points based on divergence.
    
    Returns:
    list[tuple[int, str]]: List of tuples where each tuple contains the starting sentence index of the chunk 
                           and the concatenated sentences in that chunk.
    """
    sentence_count = len(sentences)
    if sentence_count == 0:
        return []

    divergences = []
    divergence_positions = []
    current_local_position = 0
    current_global_position = 0

    inside_global_slide = 0.5
    steps = [] 
    
    while current_local_position < sentence_count - window_size // 2:
        if current_local_position - current_global_position >= int(global_window_size * inside_global_slide):
            current_global_position = max(0, current_local_position - int(global_window_size * inside_global_slide))

        global_window_end = min(current_global_position + global_window_size, sentence_count)
        global_window = sentences[current_global_position:global_window_end]

        global_window_text = ' '.join(global_window)
        global_window_embeddings = get_sentence_embeddings(global_window_text, global_window, tokenizer, model, device)

        local_window_move_step = 0
        while local_window_move_step < inside_global_slide * global_window_size and current_local_position + local_window_move_step < sentence_count:
            local_window_move_step += 1
            
            local_window_end = min(current_local_position + window_size, sentence_count)
            local_window = sentences[current_local_position:local_window_end]
            mid = window_size // 2

            if current_local_position - current_global_position + mid >= len(global_window_embeddings):
                break

            first_half_embeddings = global_window_embeddings[current_local_position - current_global_position:current_local_position - current_global_position + mid]
            second_half_embeddings = global_window_embeddings[current_local_position - current_global_position + mid:local_window_end - current_global_position]
            mid_embedding = global_window_embeddings[current_local_position - current_global_position + mid]
            
            divergence = modified_divergence_half(first_half_embeddings, second_half_embeddings, mid_embedding)
            
            divergences.append(divergence)
            divergence_positions.append(current_local_position + mid)
            
            current_local_position += sliding_step
        inside_global_slide = 0.3

    if not divergences:
        return [(0, sentences)]

    threshold_divergence = np.percentile(divergences, percentile_threshold)

    steps = dynamic_window_adjustment(divergences)

    final_splits = []
    current_split = 0
    min_chunk_size = max(1, sentence_count // 30)

    for idx, div in zip(divergence_positions, divergences):
        if div > threshold_divergence and (idx - current_split) >= min_chunk_size:
            final_splits.append((current_split, sentences[current_split: idx]))
            current_split = idx

    final_splits.append((current_split, sentences[current_split:]))
    return final_splits, divergences

def map_sentence_to_chunk(sentences, segments):
    sentence_to_chunk_map = {}
    sentence_idx = 0  # Initialize index for sentences list
    segments = segments.copy()
    
    for chunk_id, segment in enumerate(segments):
        for _ in segment[1]:
            sentence_to_chunk_map[sentence_idx] = chunk_id
            sentence_idx += 1
    
    return sentence_to_chunk_map

def mark_segments_id_into_transcript(sentence_to_chunk_map, input_data):
    sentence_idx = 0

    for utterance in input_data.utterances:
        for sentence in utterance.transcript:
            if sentence_idx in sentence_to_chunk_map:
                sentence.chunk = sentence_to_chunk_map[sentence_idx]
            sentence_idx += 1
    return input_data

def output_to_json(input_data):
    output = {}
    output['utterances'] = []
    for utterance in input_data.utterances:
        utterance_dict = {}
        utterance_dict['speaker'] = utterance.speaker
        utterance_dict['transcript'] = []
        for sentence in utterance.transcript:
            sentence_dict = {}
            sentence_dict['text'] = sentence.text
            sentence_dict['chunk'] = sentence.chunk
            utterance_dict['transcript'].append(sentence_dict)
        utterance_dict['start'] = utterance.start
        utterance_dict['end'] = utterance.end
        output['utterances'].append(utterance_dict)
    return output
