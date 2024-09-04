from pydantic import BaseModel
from typing import List


class Keyword(BaseModel):
    word: str
    definition: str


class KeywordCollection(BaseModel):
    keywords: List[Keyword]

