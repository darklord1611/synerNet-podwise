from pydantic import BaseModel
from typing import List


class ChunkInput(BaseModel):
    chunk: int
    timestamp: float
    text: str


class BaseRequest(BaseModel):
    transcript: List[ChunkInput]

