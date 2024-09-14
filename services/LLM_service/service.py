from __future__ import annotations

from numpy import ndarray
from pydantic import BaseModel, Field
from typing import List
from PIL import Image as PILImage
import typing as t
import bentoml
from time import time
from config import LLM_SERVICE_PORT, GROQ_API_KEY
from utils.requests import BaseRequest
from groq import Groq

from utils.pipeline import LLMPipeline
import json



@bentoml.service(
    resources={"cpu": "2"},
    traffic={"timeout": 100000},
    http={
        "port": int(LLM_SERVICE_PORT),
        "cors": {
            "enabled": True,
            "access_control_allow_origins": ["*"],
            "access_control_allow_methods": ["GET", "OPTIONS", "POST", "HEAD", "PUT"],
            "access_control_allow_credentials": True,
            "access_control_allow_headers": ["*"],
            "access_control_max_age": 1200,
            "access_control_expose_headers": ["Content-Length"]
        }
    },
    
    
)
class LLMService():
    def __init__(self) -> None:
        self.max_paragraph_per_article = 10
        self.pipeline = LLMPipeline()

    @bentoml.api(input_spec=BaseRequest, route="/summary")
    def create_summary(self, **params: t.Any) -> dict:
        """Creates a summary of an epsiode of a podcast."""
        outlines = []
        chunk_summaries = []

        for i, chunk_input in enumerate(params["transcript"]):
            
            print("Current chunk: ", i)
            article = " ".join(chunk_input.text)
            summary, title = self.pipeline.summarize(article)
            chunk_summaries.append(summary)
            outline_temp = {
                "timestamp": chunk_input.timestamp,
                "title": title,
                "description": summary
            }
            outlines.append(outline_temp)
        

        entire_transcript = " ".join(chunk_summaries)
        entire_transcript_summary, general_title = self.pipeline.summarize(entire_transcript, optimize=True)

        entire_transcript_takeaways = self.pipeline.extract_takeaways(entire_transcript)

        json_data = {
            "summary": entire_transcript_summary,
            "takeaways": entire_transcript_takeaways,
            "outlines": outlines
        }
        return json_data


    @bentoml.api(input_spec=BaseRequest, route="/keywords")
    def extract_keywords(self, **params: t.Any) -> dict:
        """Extract keywords of an epsiode of a podcast."""

        keywords = []
        for i, chunk_input in enumerate(params["transcript"]):
            print("Current chunk: ", i)
            keywords.extend(self.pipeline.extract_keywords(chunk_input.text))

        json_data = {"status": "success", "keywords": keywords}

        return json_data
    
    @bentoml.api(input_spec=BaseRequest, route="/highlights")
    def extract_highlight(self, **params: t.Any) -> dict:
        """Extract highlights of an epsiode of a podcast."""


        highlights = []
        for i, chunk_input in enumerate(params["transcript"]):
            print("Current chunk: ", i)
            temp = self.pipeline.extract_highlights(chunk_input.text)
            cur_highlights = [{"timestamp": 100, "highlight": h} for h in temp]
            highlights.extend(cur_highlights)

        json_data = {"status": "success", "highlights": highlights}

        return json_data
    

    @bentoml.api(input_spec=BaseRequest, route="/keypoints")
    def extract_keypoint(self, **params: t.Any) -> dict:
        """Extract keypoints of an epsiode of a podcast."""
        keypoints = []

        # combine chunks before extracting keypoints


        for i, chunk_input in enumerate(params["transcript"]):
            
            print("Current chunk: ", i)
            keypoint = self.pipeline.extract_keypoints(chunk_input.text)
            keypoints.append({"keypoint": keypoint})


        json_data = {"status": "success", "keypoints": keypoints}
        
        with open("temp_keypoints.json", "w") as f:
            json.dump(json_data, f, default=lambda o: o.__dict__, indent=4, ensure_ascii=False)
        return json_data
    
    @bentoml.api(input_spec=BaseRequest, route="/chunks")
    def combine_chunks(self, **params: t.Any) -> dict:
        """Extract keypoints of an epsiode of a podcast."""

        combined_chunks = self.pipeline.combine_chunks(params["transcript"])
        json_data = {"status": "success", "combined_chunks": combined_chunks}
        
        with open("temp_combination.json", "w") as f:
            json.dump(json_data, f, default=lambda o: o.__dict__, indent=4, ensure_ascii=False)
        return json_data
