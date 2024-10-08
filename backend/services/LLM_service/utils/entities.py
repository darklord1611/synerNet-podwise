from pydantic import BaseModel
from typing import List, Optional


class Keyword(BaseModel):
    keyword: str
    definition: str


class KeywordCollection(BaseModel):
    keywords: List[Keyword]


class Summary(BaseModel):
    missing_entities: List[str]
    denser_summary: str


class BackupSummary(BaseModel):
    title: str
    summary: str


class SummaryCollection(BaseModel):
    title: str
    summaries_per_step: List[Summary]


class HighlightCollection(BaseModel):
    highlights: List[str]

class TakeawayCollection(BaseModel):
    takeaways: List[str]



# Define the subtopic structure
class Subpoint(BaseModel):
    title: str
    points: Optional[List['Subpoint']] = []


class CombinedChunks(BaseModel):
    paragraph_indexes: List[int]
    title: str

class CombinedChunksCollection(BaseModel):
    combination: List[CombinedChunks]

# Define the main topic structure
class Keypoint(BaseModel):
    title: str
    timestamp: float = 0.0
    points: List[Subpoint]

