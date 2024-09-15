import os
import uvicorn
import json
from fastapi import FastAPI, Request, HTTPException
from YoutubeLoader import download_audio_from_youtube

from Transcript import transcribe_audio

app = FastAPI()

@app.get("/")
def welcome():
    return "Hello!"

@app.post("/transcript")
async def get_transcript(youtube_url: str):
    try:

        audio_path = download_audio_from_youtube(youtube_url)
        formatted_results = await transcribe_audio(audio_path)

        with open("formatted_response.json", "w") as f:
            json.dump({"results": {"utterances": formatted_results}}, f, indent=4)

        return {"status": "success", "transcript": formatted_results}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")