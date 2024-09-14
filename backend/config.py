import os
from os.path import join, dirname
from dotenv import load_dotenv

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")

APP_HOST = os.environ.get("APP_HOST")
APP_PORT = os.environ.get("APP_PORT")

PODCAST_API_URL = os.environ.get("PODCAST_API_URL")
PODCAST_API_KEY = os.environ.get("PODCAST_API_KEY")

PODCAST_USER_ID = os.environ.get("PODCAST_USER_ID")
