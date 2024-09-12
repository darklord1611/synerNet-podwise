from __future__ import annotations

from numpy import ndarray
from pydantic import BaseModel, Field
from typing import List
from PIL import Image as PILImage
import typing as t
import bentoml
from time import time
from config import LLM_SERVICE_PORT, GROQ_API_KEY
from utils.highlight_pipeline import HighlightPipeline
from utils.requests import BaseRequest
from utils.preprocess import split_into_articles
from groq import Groq
from utils.summary_pipeline import SummaryPipeline
from utils.keyword_pipeline import KeywordPipeline
from utils.keypoint_pipeline import KeypointPipeline
import json



@bentoml.service(
    resources={"cpu": "1"},
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
        self.summary_pipeline = SummaryPipeline()
        self.keyword_pipeline = KeywordPipeline()
        self.highlight_pipeline = HighlightPipeline()
        self.keypoint_pipeline = KeypointPipeline()

    @bentoml.api(input_spec=BaseRequest, route="/summary")
    def create_summary(self, **params: t.Any) -> dict:
        """Creates a summary of an epsiode of a podcast."""
        outlines = []
        chunk_summaries = []

        for i, chunk_input in enumerate(params["transcript"]):
            
            print("Current chunk: ", i)
            article = " ".join(chunk_input.text)
            summary, title = self.summary_pipeline.summarize(article)
            chunk_summaries.append(summary)
            outline_temp = {
                "timestamp": chunk_input.timestamp,
                "title": title,
                "description": summary
            }
            outlines.append(outline_temp)
        

        entire_transcript = " ".join(chunk_summaries)
        entire_transcript_summary, general_title = self.summary_pipeline.summarize(entire_transcript, optimize=True)

        entire_transcript_takeaways = self.summary_pipeline.extract_takeaways(entire_transcript)

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
            keywords.extend(self.keyword_pipeline.extract_keywords(chunk_input.text))

        json_data = {"status": "success", "keywords": keywords}

        return json_data
    
    @bentoml.api(input_spec=BaseRequest, route="/highlights")
    def extract_highlight(self, **params: t.Any) -> dict:
        """Extract highlights of an epsiode of a podcast."""


        highlights = []
        for i, chunk_input in enumerate(params["transcript"]):
            print("Current chunk: ", i)
            temp = self.highlight_pipeline.extract_highlights(chunk_input.text)
            cur_highlights = [{"timestamp": 100, "highlight": h} for h in temp]
            highlights.extend(cur_highlights)

        json_data = {"status": "success", "highlights": highlights}

        return json_data
    

    @bentoml.api(input_spec=BaseRequest, route="/keypoints")
    def extract_keypoint(self, **params: t.Any) -> dict:
        """Extract keypoints of an epsiode of a podcast."""
        keypoints = []
        for i, chunk_input in enumerate(params["transcript"]):

            print("Current chunk: ", i)
            temp = self.keypoint_pipeline.extract_keypoints(chunk_input.text)
            cur_keypoints = [{"keypoint": h} for h in temp]
            keypoints.extend(cur_keypoints)

        print(keypoints)

        json_data = {"status": "success", "keypoints": keypoints}
        
        return json_data