import sys
from dotenv import load_dotenv
import os
sys.path.insert(0, os.path.realpath(os.path.pardir))
from fastapi import FastAPI, File, UploadFile, Body
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from celery_tasks.tasks import predict_image
from celery.result import AsyncResult
from api.models import Prediction, Task
from services.audio_service.YoutubeLoader import download_audio_from_youtube
from services.audio_service.Transcript import transcribe_audio
import uuid
import logging
from typing import List
import numpy as np
from supabase import create_client, Client

UPLOAD_FOLDER = 'uploads'
STATIC_FOLDER = 'static/results'

isdir = os.path.isdir(UPLOAD_FOLDER)
if not isdir:
    os.makedirs(UPLOAD_FOLDER)

isdir = os.path.isdir(STATIC_FOLDER)
if not isdir:
    os.makedirs(STATIC_FOLDER)

origins = ["*"]

load_dotenv()

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)

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

@app.post("/api/transcript")
async def get_transcript(url: str = Body(..., embed=True)):
    try:
        print(url)
        audio_path = download_audio_from_youtube(url)
        formatted_results = await transcribe_audio(audio_path)

        with open("formatted_response.json", "w") as f:
            json.dump({"results": {"utterances": formatted_results}}, f, indent=4)

        return {"status": "success", "transcript": formatted_results}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")


# @app.post('/api/process')
# async def process(files: List[UploadFile] = File(...)):
#     tasks = []
#     try:
#         for file in files:
#             d = {}
#             try:
#                 name = str(uuid.uuid4()).split('-')[0]
#                 ext = file.filename.split('.')[-1]
#                 file_name = f'{UPLOAD_FOLDER}/{name}.{ext}'
#                 with open(file_name, 'wb+') as f:
#                     f.write(file.file.read())
#                 f.close()

#                 # start task prediction
#                 task_id = predict_image.delay(os.path.join('api', file_name))
#                 d['task_id'] = str(task_id)
#                 d['status'] = 'PROCESSING'
#                 d['url_result'] = f'/api/result/{task_id}'
#             except Exception as ex:
#                 logging.info(ex)
#                 d['task_id'] = str(task_id)
#                 d['status'] = 'ERROR'
#                 d['url_result'] = ''
#             tasks.append(d)
#         return JSONResponse(status_code=202, content=tasks)
#     except Exception as ex:
#         logging.info(ex)
#         return JSONResponse(status_code=400, content=[])


# @app.get('/api/result/{task_id}', response_model=Prediction)
# async def result(task_id: str):
#     task = AsyncResult(task_id)

#     # Task Not Ready
#     if not task.ready():
#         return JSONResponse(status_code=202, content={'task_id': str(task_id), 'status': task.status, 'result': ''})

#     # Task done: return the value
#     task_result = task.get()
#     result = task_result.get('result')
#     return JSONResponse(status_code=200, content={'task_id': str(task_id), 'status': task_result.get('status'), 'result': result})


