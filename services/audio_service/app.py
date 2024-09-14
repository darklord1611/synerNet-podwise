import os
import uvicorn
import json
from fastapi import FastAPI, Request, HTTPException
from YoutubeLoader import download_audio_from_youtube
from Metadata import download_metadata
from Transcript import transcribe_audio

app = FastAPI()


@app.get("/")
def welcome():
    return "Hello!"


@app.post("/transcript")
async def get_transcript(youtube_url: str):
    try:

        audio_path = download_audio_from_youtube(youtube_url)
        metadata = download_metadata(youtube_url)
        print(metadata)
        formatted_results = await transcribe_audio(audio_path)

        out = {
            "results": {
                "metadata": metadata,
                "utterances": formatted_results
            }
        }
        with open("formatted_response.json", "w") as f:
            json.dump(out, f, indent=4)

        return out

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")




