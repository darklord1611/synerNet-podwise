import os
from os.path import join, dirname
from dotenv import load_dotenv

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

DEEPGRAM_API_KEY = os.environ.get("DEEPGRAM_API_KEY")
FFMPEG_PATH = os.environ.get("FFMPEG_PATH")