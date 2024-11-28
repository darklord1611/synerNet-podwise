import asyncio
import json
import os
from deepgram import Deepgram
from config import DEEPGRAM_API_KEY

async def transcribe_audio(url):
    # Khởi tạo Deepgram client với API key
    deepgram = Deepgram(DEEPGRAM_API_KEY)

    # Tạo các option cho yêu cầu ghi âm sẵn, bật tính năng diarize
    options = {
        "model": "whisper-medium",
        "language": "en",
        "smart_format": True,
        "diarize": True  # Bật tính năng nhận diện người nói
    }
    if url == "./data/audio.wav":
        # Mở file âm thanh cục bộ
        with open(url, 'rb') as audio_file:
            audio_data = audio_file.read()

        # Thực hiện gọi API để phiên âm file âm thanh cục bộ
        response = await deepgram.transcription.prerecorded({
            'buffer': audio_data,
            'mimetype': 'audio/wav'
        }, options)
    else:
        # URL to the audio file
        AUDIO_URL = {
            "url": f"{url}"
        }
        response = await deepgram.transcription.prerecorded(AUDIO_URL, options)
    # Tạo danh sách kết quả theo định dạng mong muốn
    formatted_results = []
    for paragraph in response['results']['channels'][0]["alternatives"][0]['paragraphs']['paragraphs']:
        transcript = []
        for sentence in paragraph["sentences"]:
            transcript.append(sentence["text"])
        result_entry = {
            "transcripts": transcript,
            "speaker": paragraph['speaker'],
            "start": sentence['start'],
            "end": sentence['end']
        }
        formatted_results.append(result_entry)

    return formatted_results