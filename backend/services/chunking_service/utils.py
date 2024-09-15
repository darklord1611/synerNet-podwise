import os
import json
from typing import List, Optional, Union
from schemas import Sentence, Utterance, Transcript

def load_raw_data(file_path: str):
    raw_data = {}
    if os.path.exists(file_path):
        with open(file_path, 'r') as file:
            raw_data = json.load(file)
        print('File loaded successfully')
    else:
        print('File not found')
    return raw_data

def transform_data(raw_data):
    utterances = []
    raw_data = raw_data['results']
    for utterance in raw_data['utterances']:
        sentences = []
        for sentence in utterance['transcripts']:
            sentences.append(Sentence(text=sentence))
        utterances.append(Utterance(speaker=utterance['speaker'], transcript=sentences, start = utterance['start'], end = utterance['end']))
    return Transcript(utterances=utterances)

def process_input(file_path: Union[str, dict]) -> Transcript:
    if isinstance(file_path, str):
        raw_data = load_raw_data(file_path)
    else: raw_data = file_path
    return transform_data(raw_data)