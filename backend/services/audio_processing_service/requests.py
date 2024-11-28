from pydantic import BaseModel

class AudioRequest(BaseModel):
    url: str