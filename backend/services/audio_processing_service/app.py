import os
import uvicorn
import json
from fastapi import FastAPI, Request, HTTPException
from YoutubeLoader import download_audio_from_youtube
from Metadata import download_metadata, download_metadata_v2
from Transcript import transcribe_audio
from fastapi.middleware.cors import CORSMiddleware
from requests import AudioRequest

app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def welcome():
    return "Hello!"

@app.post("/youtube_transcript")
async def get_transcript(audio_request: AudioRequest):
    try:
        youtube_url = audio_request.url
        audio_path = download_audio_from_youtube(youtube_url)
        # metadata = download_metadata(youtube_url)
        metadata = download_metadata_v2(youtube_url)
        print(metadata)
        formatted_results = await transcribe_audio(audio_path)

        out = {
            "results": {
                "metadata": metadata,
                "utterances": formatted_results
            }
        }

        return out

    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

@app.post("/audio_transcript")
async def get_transcript(audio_request: AudioRequest):
    try:
        print(audio_request.url)
        formatted_results = await transcribe_audio(audio_request.url)
        out = {
            "results": {
                "utterances": formatted_results
            }
        }
        with open("formatted_response.json", "w") as f:
            json.dump(out, f, indent=4)

        return out

    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
