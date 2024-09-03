from pydantic import BaseModel
from typing import List



class SummaryRequest(BaseModel):
    paragraph_list: List[str]



