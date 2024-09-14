import os
from pydantic import BaseModel, Field
from typing import List, Optional

class Sentence(BaseModel):
    text: str = ""
    chunk: Optional[int] = None

class Utterance(BaseModel):
    speaker: int
    transcript: List[Sentence]
    start: float
    end: float

class Transcript(BaseModel):
    utterances: List[Utterance]