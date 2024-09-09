from pydantic import BaseModel
from typing import List


class Keyword(BaseModel):
    word: str
    definition: str


class KeywordCollection(BaseModel):
    keywords: List[Keyword]


class Summary(BaseModel):
    missing_entities: List[str]
    denser_summary: str


class SummaryCollection(BaseModel):
    summaries_per_step: List[Summary]


class HighlightCollection(BaseModel):
    highlights: List[str]

class TakeawayCollection(BaseModel):
    takeaways: List[str]
