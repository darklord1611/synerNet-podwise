import os
import torch
import uvicorn
from fastapi import FastAPI
from transformers import AutoTokenizer, AutoModel
from utils import transform_data
from schemas import Transcript, Sentence, Utterance
from miniseg_modeling import create_list_sentences, create_text_segments, load_model, map_sentence_to_chunk, mark_segments_id_into_transcript, output_to_json
from embedding_modeling import semantic_splitter_colbert_modified
import embedding_modeling

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Welcome to chunking service!"}

@app.post("/call_chunking")
async def chunk_transcript(transcript: dict):
    input_data = transform_input(transcript)
    check_time = check_time_length(transcript)
    if check_time == 'model':
        output = model_processing(input_data)
    else:
        output = no_model_processing(input_data)
    return output

def transform_input(transcript: dict):
    return transform_data(transcript)

def model_processing(input_data):
    device = 'cuda' if torch.cuda.is_available() else 'cpu'
    model = load_model(checkpoint_path='checkpoint_epoch_10.pth.tar', device=device)
    tokenizer1 = AutoTokenizer.from_pretrained("sentence-transformers/all-MiniLM-L12-v2")
    sentences = create_list_sentences(input_data)
    sm, preds = create_text_segments(sentences, tokenizer1, 64, model, method='find_peaks', window_size=18, peak_threshold=0.2, k=4, device=device)

    sentence_to_chunk_map = map_sentence_to_chunk(sentences, sm)
    input_data = mark_segments_id_into_transcript(sentence_to_chunk_map, input_data)

    out_json = output_to_json(input_data)
    return out_json

def no_model_processing(input_data):
    device = 'cuda' if torch.cuda.is_available() else 'cpu'
    tokenizer = AutoTokenizer.from_pretrained('jinaai/jina-embeddings-v2-base-en')
    model = AutoModel.from_pretrained('jinaai/jina-embeddings-v2-base-en', trust_remote_code=True).to(device)

    sentences = embedding_modeling.create_list_sentences(input_data)

    sm, divergences = embedding_modeling.semantic_splitter_colbert_modified(sentences, tokenizer = tokenizer, model = model, device = device)
    
    sentence_to_chunk_map = embedding_modeling.map_sentence_to_chunk(sentences, sm)
    input_data = embedding_modeling.mark_segments_id_into_transcript(sentence_to_chunk_map, input_data)

    out_json = embedding_modeling.output_to_json(input_data)
    return out_json

def check_time_length(transcript: dict):
    utts = transcript['results']['utterances']
    time_len = utts[-1]['end']
    time_len = time_len / 60
    if time_len <= 30:
        return 'model'
    return 'no_model'

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
