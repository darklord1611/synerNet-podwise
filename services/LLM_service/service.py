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
import json



EXAMPLE_PARAGRAPH_LIST = [
    "Welcome to 'The Curious Mind' podcast! Today, we’re diving deep into the mysterious and captivating world of urban legends. These tales have been whispered around campfires, shared in hushed tones at sleepovers, and circulated endlessly through word of mouth and, more recently, the internet. What makes urban legends so fascinating is their ability to persist through the ages, often with no clear origin, yet somehow they seem familiar to everyone. These stories tap into our deepest fears, desires, and curiosities, often reflecting the societal anxieties of the time.",
    
    "Let's kick things off with one of the most iconic urban legends: the 'Vanishing Hitchhiker.' It’s a classic tale that has been told in countless variations across the world. Typically, the story goes that a driver picks up a hitchhiker—usually a young woman—on a deserted road. The hitchhiker seems normal, but when the driver arrives at the destination, the passenger has mysteriously vanished, leaving behind only a chilling reminder that she was never really there. Later, the driver learns that the hitchhiker was, in fact, a ghost of someone who had died tragically years earlier. This story is fascinating not just for its spooky factor but because of how it has evolved over time. The 'Vanishing Hitchhiker' legend can be traced back to the early 19th century and has appeared in various forms in different cultures. In some versions, the hitchhiker leaves a piece of clothing or a memento behind, while in others, the driver discovers the hitchhiker’s identity after visiting a cemetery where she was buried. The beauty of this legend lies in its adaptability; it changes with the times, taking on new forms while maintaining its eerie core.",
    
    "Next, let’s talk about 'The Hookman.' This story has become a staple of American folklore, particularly among teenagers. The story usually takes place on a secluded lover’s lane, where a young couple is parked, perhaps making out, when they hear a strange scratching noise outside the car. Spooked, they drive away, only to discover later that a deranged man with a hook for a hand was lurking nearby. In some versions, the hook is found hanging from the car door handle, a grim reminder of their narrow escape. What’s particularly interesting about 'The Hookman' legend is how it reflects the anxieties of its time. The story gained traction in the 1950s, an era when car culture and teenage dating were becoming more mainstream. The legend served as a cautionary tale, warning teens about the dangers of being alone in remote places and, perhaps, engaging in activities that were considered risky or immoral. Over time, the story has been retold in various forms, sometimes as a ghost story, other times as a morality tale. Yet, at its core, it continues to resonate because it taps into universal fears of vulnerability and danger.",
    
    "Now, moving on to another classic: 'Bloody Mary.' This legend has been a rite of passage for generations of children, especially at sleepovers. The ritual is simple yet terrifying: stand in front of a mirror in a darkened room, chant 'Bloody Mary' three times, and supposedly, she will appear in the reflection. Depending on the version, she might be a vengeful spirit, a murdered woman seeking justice, or even the ghost of Queen Mary I of England, also known as 'Bloody Mary' for her brutal persecution of Protestants. The origins of the 'Bloody Mary' legend are murky, with some tracing it back to Victorian-era divination rituals where young women would gaze into a mirror to catch a glimpse of their future husband. Over time, this practice morphed into something far more sinister, becoming a test of courage among children. What’s particularly intriguing about 'Bloody Mary' is how it blends elements of folklore, psychology, and superstition. The fear of mirrors and what they might reveal is deeply embedded in many cultures, and this legend plays on that primal fear. Additionally, the mirror itself acts as a symbol of self-reflection, making the legend a psychological test as much as a spooky challenge.",
    
    "But urban legends aren't just about scares—they also serve as social commentary, reflecting the values, fears, and concerns of the times in which they are told. Take, for instance, the legend of 'The Killer in the Backseat.' This story usually involves a woman driving alone at night when a mysterious vehicle begins tailing her, flashing its lights or honking repeatedly. Terrified, she rushes to safety, only to discover that the driver wasn’t the threat—instead, there was a killer hiding in her backseat, and the other driver was trying to warn her. This legend taps into the fear of being followed or watched, but it also touches on issues of trust and vulnerability, especially for women traveling alone. It’s a powerful reminder of how urban legends can encapsulate complex emotions and societal concerns in a simple, yet effective, narrative.",
    
    "Urban legends are also fascinating because of how they spread. Before the internet, these stories were passed down orally, changing slightly with each retelling. With the rise of mass media, some legends found new life through television, movies, and books. And now, in the digital age, urban legends spread faster than ever, often going viral on social media. Websites like Snopes and Reddit’s 'NoSleep' community have become modern hubs for urban legends, where new stories are created and old ones are reinterpreted. The internet has also given rise to 'creepypasta,' a form of online horror fiction that often blurs the line between fiction and reality, creating new urban legends for a digital generation. Stories like 'Slender Man' and 'The Russian Sleep Experiment' are prime examples of how the internet has become a breeding ground for modern myths that resonate with contemporary fears.",
    
    "But why do we love these stories so much? Perhaps it’s because they offer a way to explore our fears in a safe and controlled environment. Listening to or sharing an urban legend allows us to confront the unknown without actually facing real danger. These stories also serve as a form of social bonding. Whether you're sharing a ghost story around a campfire or discussing a creepy tale with friends online, urban legends bring people together through shared experiences of fear and curiosity. And let's not forget the thrill of the unknown. Urban legends often leave us with more questions than answers, and it’s that lingering sense of mystery that keeps us coming back for more.",
    
    "As we explore these legends, it's important to remember that they’re not just stories—they’re cultural artifacts that offer insights into the collective psyche. Each legend, no matter how fantastical, is rooted in the realities and anxieties of the time and place where it originated. They serve as a mirror, reflecting back our deepest fears and desires, often revealing more about ourselves than we might realize."
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
        self.max_paragraph_per_article = 2
        self.summary_pipeline = SummaryPipeline()
        self.keyword_pipeline = KeywordPipeline()

    @bentoml.api(input_spec=SummaryRequest, route="/summarize")
    def create_summary(self, **params: t.Any) -> dict:
        """Creates a summary of an epsiode of a podcast."""

        # article consists of multiple paragraphs
        articles = split_into_articles(params["paragraph_list"], self.max_paragraph_per_article)

        article_summaries = []
        outlines = []
        for article in articles:
            print(article)
            summary = self.summary_pipeline.summarize(article, return_initial_summary=False)
            outline_temp = {
                "timestamp": 100,
                "title": "Temporary",
                "description": summary
            }
            outlines.append(outline_temp)
            article_summaries.append(summary)
        general_article = " ".join(article_summaries)

        general_article_summary = self.summary_pipeline.summarize(general_article, return_initial_summary=False)
        general_article_takeaways = self.summary_pipeline.extract_takeaways(general_article)

        json_data = {
            "summary": general_article_summary,
            "takeaways": general_article_takeaways,
            "outlines": outlines
        }
        with open('temp_summary.json', 'w') as out_file:
            json.dump(json_data, out_file, indent = 4,
                    ensure_ascii = False)
        return json_data


    @bentoml.api(input_spec=SummaryRequest, route="/extract_keywords")
    def extract_keyword(self, **params: t.Any) -> dict:
        """Extract keywords of an epsiode of a podcast."""

        # article consists of multiple paragraphs
        articles = split_into_articles(params["paragraph_list"], self.max_paragraph_per_article)

        keywords = []
        for article in articles:
            keywords.extend(self.keyword_pipeline.extract_keywords(article))

        json_data = {"status": "success", "keywords": keywords}
        with open('temp_keywords.json', 'w') as out_file:
            json.dump(json_data, out_file, default=lambda o: o.__dict__, indent = 4,
                    ensure_ascii = False)
        return json_data