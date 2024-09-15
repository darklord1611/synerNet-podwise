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
from config import SUPABASE_URL, SUPABASE_KEY, AUDIO_SERVICE_URL, LLM_SERVICE_URL, CHUNKING_SERVICE_URL
from utils.requests import EpisodeProcessingRequest
import requests
from utils.preprocess import preprocess_chunks, process_keypoints


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


def insert_episodes(data, audio_url):
    return (supabase.table("episodes").insert({
        "title": data["title"],
        "duration": data["length"],
        "audio_url": audio_url,
    }).execute())

def insert_transcript(transcript, episode_id):
    return (supabase.table("episode_summaries").insert({
        "id": episode_id,
        "transcript": transcript
    }).execute())

def insert_chunks(chunks, episode_id):
    return (supabase.table("episode_summaries").update({
        "chunks": chunks
    }).eq("id", episode_id).execute())

def insert_summaries(data, epsiode_id):
    return (supabase.table("episode_summaries").update(data).eq("id", epsiode_id).execute())


@app.post("/")

@app.post("/process_input")
async def process_input(request: EpisodeProcessingRequest):
    try:
        # Metadata

        audio_url = request.audio_url
        audio_json = {
            "url": audio_url
        }
        episode_id = None
        transcript = None
        if request.is_youtube_url:
            audio_response = requests.post(f"{AUDIO_SERVICE_URL}/youtube_transcript", json=audio_json).json()
            episode_info = audio_response["results"]["metadata"]

            # Episode info
            res = insert_episodes(episode_info, audio_url)
            if res.data:
                print("Metadata saved successfully")

                episode_id = res.data[0]["id"]
            else:
                raise Exception("Insert metadata error")
        else:
            audio_response = requests.post(f"{AUDIO_SERVICE_URL}/audio_transcript", json=audio_json).json()
            episode_id = (supabase.table("episodes").select("id, audio_url").eq("audio_url", request.audio_url).execute()).data[0]["id"]
        
        # Transcript
        transcript = { "utterances": audio_response["results"]["utterances"] }
        # res = insert_transcript(transcript, episode_id)

        # if res.data:
        #     print("Transcript saved successfully")

        #     episode_id = res.data[0]["id"]
        # else:
        #     raise Exception("Insert Transcript error")
        

        # Chunks
        chunking_response = requests.post(f"{CHUNKING_SERVICE_URL}/call_chunking", json=audio_response).json()

        # res = insert_chunks(chunking_response, episode_id)

        # if res.data:
        #     print("chunks saved successfully")

        # else:
        #     raise Exception("Insert chunks error")

        # send chunked outputs to LLM service
        # get LLM outputs: summary, keywords, highlights, keypoints(for mindmap)
        # save LLM outputs to supabase
        processed_chunks = preprocess_chunks(chunking_response)

        summary = requests.post(f"{LLM_SERVICE_URL}/summary", json=processed_chunks).json()
        keywords = requests.post(f"{LLM_SERVICE_URL}/keywords", json=processed_chunks).json()
        highlights = requests.post(f"{LLM_SERVICE_URL}/highlights", json=processed_chunks).json()
        keypoints = requests.post(f"{LLM_SERVICE_URL}/keypoints", json=processed_chunks).json()

        keypoints = process_keypoints(summary, keypoints)

        data = {
            "summary": summary,
            "keywords": keywords,
            "highlights": highlights,
            "keypoints": keypoints,
            "transcript": transcript,
            "chunks": chunking_response
        }

        with open("temp_data.json", "w") as file:
            json.dumps(data, file, indent=4, ensure_ascii=False)

        # res = insert_summaries(data, episode_id)

        # if res.data:
        #     print("Summaries saved successfully")

        # else:
        #     raise Exception("Insert summaries error")

        return {"status": "success", "message": "Episode processes successfully"}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
    


@app.post("/api/transcript")
async def get_transcript(url: str = Body(..., embed=True)):
    pass
    # try:
    #     print(url)
    #     audio_path = download_audio_from_youtube(url)
    #     formatted_results = await transcribe_audio(audio_path)

    #     with open("formatted_response.json", "w") as f:
    #         json.dump({"results": {"utterances": formatted_results}}, f, indent=4)

    #     return {"status": "success", "transcript": formatted_results}

    # except Exception as e:
    #     raise HTTPException(status_code=500, detail=f"Error: {str(e)}")




