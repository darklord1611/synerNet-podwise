import json
import sys
import os
sys.path.insert(0, os.path.realpath(os.path.pardir))
from fastapi import FastAPI, File, HTTPException, UploadFile, Body
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse


# from services.audio_service.YoutubeLoader import download_audio_from_youtube
# from services.audio_service.Transcript import transcribe_audio
import uuid
import logging
from typing import List

from supabase import create_client, Client
from config import SUPABASE_URL, SUPABASE_KEY, APP_HOST, APP_PORT
from utils.requests import EpisodeProcessingRequest



UPLOAD_FOLDER = 'uploads'
STATIC_FOLDER = 'static/results'

isdir = os.path.isdir(UPLOAD_FOLDER)
if not isdir:
    os.makedirs(UPLOAD_FOLDER)

isdir = os.path.isdir(STATIC_FOLDER)
if not isdir:
    os.makedirs(STATIC_FOLDER)

origins = ["*"]


supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

app = FastAPI()
app.mount("/static", StaticFiles(directory=STATIC_FOLDER), name="static")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
async def index():
    return {'message': 'Hello World'}


@app.post("/api/upload")
async def process_input(request: EpisodeProcessingRequest):
    try:
        # send audio_url to audio service
        # get transcript from audio service
        # save transcript to supabase

        # send transcript to chunking service
        # get chunked outputs from chunking service
        # save chunked outputs to supabase
        
        chunks = {
            "chunk" : 0,
            "text" : "This is a sample text"
        }
        # send chunked outputs to LLM service
        # get LLM outputs: summary, keywords, highlights, keypoints(for mindmap)
        # save LLM outputs to supabase

        print(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

@app.post("/api/transcript")
async def get_transcript(url: str = Body(..., embed=True)):
    # try:
    #     print(url)
    #     audio_path = download_audio_from_youtube(url)
    #     formatted_results = await transcribe_audio(audio_path)

    #     with open("formatted_response.json", "w") as f:
    #         json.dump({"results": {"utterances": formatted_results}}, f, indent=4)

    #     return {"status": "success", "transcript": formatted_results}

    # except Exception as e:
    #     raise HTTPException(status_code=500, detail=f"Error: {str(e)}")




