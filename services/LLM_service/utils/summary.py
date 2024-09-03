from pydantic import BaseModel
from typing import List


class Summary(BaseModel):
    missing_entities: List[str]
    denser_summary: str


class SummaryCollection(BaseModel):
    summaries_per_step: List[Summary]

