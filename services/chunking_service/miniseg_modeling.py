import math
import torch
import torch.nn as nn
from transformers import AutoModel
from schemas import Transcript, Sentence, Utterance
from scipy.signal import find_peaks
import numpy as np



class RotaryPositionEmbeddings(nn.Module):
    def __init__(self, dim):
        super(RotaryPositionEmbeddings, self).__init__()
        self.dim = dim
        inv_freq = 1.0 / (10000 ** (torch.arange(0, dim, 2).float() / dim))
        self.register_buffer("inv_freq", inv_freq)

    def forward(self, seq_len, device):
        t = torch.arange(seq_len, device=device, dtype=self.inv_freq.dtype)
        freqs = torch.einsum("i,j->ij", t, self.inv_freq)
        emb = torch.cat((freqs, freqs), dim=-1)  # Expand to full dimension
        return torch.cos(emb), torch.sin(emb)

def apply_rotary_pos_emb(x, cos, sin):
    # Assuming x has shape [batch_size, doc_len, dim] e.g. [1, 37, 384]
    head_dim = x.shape[-1] // 2  # Compute the head_dim based on the last dimension of x = 384/2= 192

    # Split x into two halves
    x1, x2 = x[..., :head_dim], x[..., head_dim:]
    # print(f'x1 shape: {x1.shape}')
    # print(f'x2 shape: {x2.shape}')
    # Ensure cos and sin have the correct shape to match x1 and x2
    cos = cos.unsqueeze(0)  # Shape [1, seq_len, head_dim]
    # print(f'cos shape: {cos.shape}')
    sin = sin.unsqueeze(0)  # Shape [1, seq_len, head_dim]
    # print(f'sin shape: {sin.shape}')

    return torch.cat([x1 * cos - x2 * sin, x1 * sin + x2 * cos], dim=-1)



class SentenceEncoder(nn.Module):
    def __init__(self, model_name="sentence-transformers/all-MiniLM-L12-v2"):
        super(SentenceEncoder, self).__init__()
        self.model = AutoModel.from_pretrained(model_name)

        # freeez half of the layers
        for param in self.model.parameters():
            param.requires_grad = False
        
        for param in self.model.encoder.layer[-6:].parameters():
            param.requires_grad = True

    def forward(self, input_ids, attention_mask):
        batch_size, num_sentences, max_seq_len = input_ids.size()
        
        input_ids = input_ids.view(batch_size * num_sentences, max_seq_len)
        attention_mask = attention_mask.view(batch_size * num_sentences, max_seq_len)

        outputs = self.model(input_ids=input_ids, attention_mask=attention_mask)
        sentence_embeddings = outputs.last_hidden_state.mean(dim=1)

        sentence_embeddings = sentence_embeddings.view(batch_size, num_sentences, -1)
        
        return sentence_embeddings


class DocumentEncoder(nn.Module):
    def __init__(self, hidden_dim=384, num_layers=12, num_heads=8):
        super(DocumentEncoder, self).__init__()
        self.encoder_layer = nn.TransformerEncoderLayer(
            d_model=hidden_dim, nhead=num_heads
        )
        self.transformer_encoder = nn.TransformerEncoder(self.encoder_layer, num_layers=num_layers)
        self.rope = RotaryPositionEmbeddings(hidden_dim * 4 // num_heads)
        self.fc = nn.Linear(hidden_dim, 1)
        self.sigmoid = nn.Sigmoid()

    def forward(self, sentence_embeddings):
        seq_len = sentence_embeddings.size(1)
        cos, sin = self.rope(seq_len, sentence_embeddings.device)
        sentence_embeddings = apply_rotary_pos_emb(sentence_embeddings, cos, sin)
        sentence_embeddings = self.transformer_encoder(sentence_embeddings)
        logits = self.fc(sentence_embeddings)
        return self.sigmoid(logits)

class MiniSeg(nn.Module):
    def __init__(self, sentence_encoder, document_encoder):
        super(MiniSeg, self).__init__()
        self.sentence_encoder = sentence_encoder
        self.document_encoder = document_encoder

    def forward(self, input_ids, attention_mask):
        sentence_embeddings = self.sentence_encoder(input_ids, attention_mask)
        logits = self.document_encoder(sentence_embeddings)
        return logits.squeeze(-1)


def load_model(checkpoint_path = None, device = 'cpu'):
    sentence_encoder = SentenceEncoder()
    document_encoder = DocumentEncoder()
    model = MiniSeg(sentence_encoder, document_encoder)
    model = model.to(device)
    if checkpoint_path:
        cp = torch.load(checkpoint_path, map_location=device)
        model.load_state_dict(cp['state_dict'])
        print('Model loaded successfully')
    return model

def create_list_sentences(input_data: Transcript):
    sentences = []
    for utterance in input_data.utterances:
        for sentence in utterance.transcript:
            sentences.append(sentence.text)
    return sentences

def tokenize_text(sentences, tokenizer, max_length):
    print(sentences[:10])
    encoded = tokenizer(
            sentences,
            padding='max_length',
            truncation=True,
            max_length=max_length,
            return_tensors="pt"
        )
    return encoded['input_ids'], encoded['attention_mask']

def create_text_segments(sentences, tokenizer, max_length, model, method='adaptive_threshold', window_size=10, peak_threshold=0.2, k=3, device = 'cpu'):
    model = model.to(device)
    model.eval()
    segments = []
    with torch.no_grad():
        input_ids, attention_mask = tokenize_text(sentences, tokenizer, max_length)
        input_ids = input_ids.to(device).unsqueeze(0)
        attention_mask = attention_mask.to(device).unsqueeze(0)
        print(f'Shape of input_ids: {input_ids.shape}')
        print(f'Shape of attention_mask: {attention_mask.shape}')
        logits = model(input_ids, attention_mask)
        raw_preds = logits.cpu().numpy().tolist()[0]

        print(f'Shape of raw_preds: {len(raw_preds)}')

        if method == 'moving_average':
                # Calculate moving average
            moving_avg = np.convolve(raw_preds, np.ones(window_size) / window_size, mode='valid')
            # Join segments based on moving average exceeding threshold
            segment = []
            for i, pred in enumerate(raw_preds):
                segment.append(sentences[i])
                if i >= window_size - 1 and moving_avg[i - (window_size - 1)] >= peak_threshold:
                    segments.append(segment)
                    segment = []
        
        elif method == 'find_peaks':
            # Detect peaks
            peaks, _ = find_peaks(raw_preds, height=peak_threshold, distance=10, prominence=0.1)  # Adjust distance and prominence as needed
            # Join segments based on peak locations
            segment = []
            for i, pred in enumerate(raw_preds):
                segment.append(sentences[i])
                if i in peaks:
                    segments.append(segment)
                    segment = []
        
        elif method == 'adaptive_threshold':
            # Calculate adaptive threshold
            mean_pred = np.mean(raw_preds)
            print(mean_pred)
            std_pred = np.std(raw_preds)
            print(std_pred)
            adaptive_threshold = mean_pred + k * std_pred
            
            # Join segments based on adaptive threshold
            segment = []
            for i, pred in enumerate(raw_preds):
                segment.append(sentences[i])
                if pred >= adaptive_threshold:
                    segments.append(segment)
                    segment = []

        # If there are remaining sentences, append them as the last segment
        if segment:
            segments.append((segment))

    return segments, raw_preds


def map_sentence_to_chunk(sentences, segments):
    sentence_to_chunk_map = {}
    sentence_idx = 0  # Initialize index for sentences list
    
    for chunk_id, segment in enumerate(segments):
        for _ in segment:  # We don't need to match text, just index through
            # Map the sentence index to the chunk_id
            sentence_to_chunk_map[sentence_idx] = chunk_id
            sentence_idx += 1  # Move to the next sentence
    
    return sentence_to_chunk_map

def mark_segments_id_into_transcript(sentence_to_chunk_map, input_data):
    sentence_idx = 0  # Initialize index for all sentences in the input_data

    # Loop through all utterances and their sentences in input_data
    for utterance in input_data.utterances:
        for sentence in utterance.transcript:
            # Assign chunk based on the sentence index from the mapping
            if sentence_idx in sentence_to_chunk_map:
                sentence.chunk = sentence_to_chunk_map[sentence_idx]
            sentence_idx += 1  # Move to the next sentence in the transcript

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
