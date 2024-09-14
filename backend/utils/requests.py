from pydantic import BaseModel



class EpisodeProcessingRequest(BaseModel):
    audio_url: str

