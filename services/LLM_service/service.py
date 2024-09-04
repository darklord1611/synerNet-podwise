from __future__ import annotations

from numpy import ndarray
from pydantic import BaseModel, Field
from typing import List
from PIL import Image as PILImage
import typing as t
import bentoml
from time import time
from config import LLM_SERVICE_PORT, GROQ_API_KEY
from utils.requests import SummaryRequest
from utils.preprocess import split_into_articles
from groq import Groq
from utils.summary_pipeline import SummaryPipeline
from utils.keyword_pipeline import KeywordPipeline




EXAMPLE_PARAGRAPH_LIST = [
    "Forests are essential ecosystems that support diverse life forms, providing shelter, food, and resources for countless species. Their preservation is crucial for maintaining biodiversity, which in turn supports ecological balance and resilience. The interconnected nature of species within forests highlights the need to protect these environments from degradation and ensure the sustainability of their ecosystems.",
    "Forests play a critical role in combating climate change by absorbing carbon dioxide from the atmosphere through carbon sequestration. This process helps mitigate the effects of greenhouse gases, making forest conservation and restoration vital strategies in addressing global warming. As climate change intensifies, protecting forests becomes even more important to maintain their ability to regulate the Earth's climate.",
    "Beyond their environmental significance, forests provide substantial economic benefits through resources like timber, water filtration, and recreational opportunities. By investing in forest conservation, societies can ensure sustainable economic growth while preserving these natural assets for future generations. The long-term economic value of forests extends far beyond immediate resource extraction, emphasizing the importance of protecting them.",
    "Forests are deeply interconnected with the water cycle, playing a key role in regulating rainfall, preventing soil erosion, and maintaining groundwater levels. Their presence reduces the risk of floods and droughts, making them essential for water security. Protecting forests is therefore crucial not only for preserving biodiversity but also for ensuring the stability of water resources and preventing land degradation.",
    "Deforestation remains a significant threat, driven by illegal logging, agricultural expansion, and infrastructure development. This leads to habitat destruction, biodiversity loss, and contributes to climate change. Addressing deforestation requires stronger policies, enforcement measures, and the adoption of sustainable forestry practices to ensure forests continue to thrive and support both the environment and human communities."
]



@bentoml.service(
    resources={"cpu": "1"},
    traffic={"timeout": 100},
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
        self.max_paragraph_per_article = 5
        self.summary_pipeline = SummaryPipeline()
        self.keyword_pipeline = KeywordPipeline()

    @bentoml.api(input_spec=SummaryRequest, route="/summarize")
    def create_summary(self, **params: t.Any) -> dict:
        """Creates a summary of an epsiode of a podcast."""

        # article consists of multiple paragraphs
        articles = split_into_articles(params["paragraph_list"], self.max_paragraph_per_article)

        article_summaries = []
        for article in articles:
            article_summaries.append(self.summary_pipeline.summarize(article, return_initial_summary=False))

        return {"article_summaries": article_summaries}


    @bentoml.api(input_spec=SummaryRequest, route="/extract_keywords")
    def extract_keyword(self, **params: t.Any) -> dict:
        """Extract keywords of an epsiode of a podcast."""

        # article consists of multiple paragraphs
        articles = split_into_articles(params["paragraph_list"], self.max_paragraph_per_article)

        keywords = []
        for article in articles:
            keywords.extend(self.keyword_pipeline.extract_keywords(article))

        print(keywords)
        return {"status": "success", "keywords": keywords}