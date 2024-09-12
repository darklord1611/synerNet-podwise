def set_keyword_prompt(article):
    return f"""
        Article:
        {article}
        ----

        You will extract increasingly concise, relevant keywords of the
        above Article and provide a definition for each keyword.

        Execute the following 2 steps.

        - Step 1: Identify the most informative and relevant Keywords from the Article.

        - Step 2: For each Keyword, provide an accurate and detailed definition, taken into account the context of the Article.

        A Keyword is:

        - Relevant: to the main story
        - Specific: descriptive yet concise (3 words or fewer)
        - Faithful: present in the Article
        - Anywhere: located anywhere in the Article

        Guidelines:
        - Extract only the sophisticated or advanced keywords from the Article. 
        - Focus more on terms that may be more difficult to understand or are specific to a particular field or subject.
        - Focus on terms that assume previous knowledge in the field or may require explanation.
        - Identify longer or technical terms that may represent advanced concepts, frameworks, or theories.
        - Ignore common, everyday words that are easily understood by a general audience.
        
        Answer in JSON.
        - Return the result in the following JSON format:
        {{
            "keywords": [
                {{
                    "keyword": "string",
                    "definition": "string"
                }},
                ...
            ]
        }}
        """



def set_highlight_prompt(article):
    return f"""
        Article:
        {article}
        ----

        You will extract relevant Highlights of the above Article.

        A Highlight is:

        - Relevant: to the main story
        - Faithful: present in the Article
        - Anywhere: located anywhere in the Article

        Guidelines:
        - Provide the exact text of the highlight in the article (keep it concise, ideally a few sentences).
        - Focus on quotes or statements that convey critical concepts, valuable advice, or significant moments in the discussion.
        - Focus on 1 to 3 most important highlights.

        Answer in JSON.
        - Return the result in the following JSON format:
        {{
            "highlights": "list of strings"
        }}

        Below is an example of the JSON format:
        {{
            "highlights": ["highlight 1", "highlight 2", "highlight 3"]
        }}
        """

def set_keypoint_prompt(article):
    return f"""
        Article:
        {article}
        ----

        You will extract a relevant Keypoint that consists of several points of the above Article.

        A Point is:

        - Relevant: to the main story
        - Descriptive: relevant and informative
        - Faithful: present in the Article
        - Anywhere: located anywhere in the Article

        Guidelines:
        - Focus on the main ideas, important topics, and significant insights discussed throughout the Article.
        - Ignore small talk, filler words, or off-topic sections.
        - Each point should be a self-contained idea or concept.
        - Points can be nested within other points to create a hierarchy of information.

        Answer in JSON.
        - Return the result in the following JSON format:
        {{
            "title": "string",
            "points": [
                {{
                    "title": "string",
                    "points": [
                        ...
                    ],
                    ...
                }},
                ...
            ]
        }}

        Below is an example of JSON format:
        {{
          "title": "Main Keypoint",
          "points": [
            {{
              "title": "Breathing Exercises",
              "points": [
                {{
                  "title": "Deep Breathing",
                  "points": []
                }},
                {{
                  "title": "Box Breathing",
                  "points": []
                }}
              ]
            }},
            {{
              "title": "Body Scan Meditation",
              "points": []
            }}
          ]
        }}
        """


def set_backup_summary_prompt(article):
    return f"""
        Article:
        {article}

        ----
        You will generate a concise, relevant summary and a title of the
        above Article.


        Answer in JSON.

        > The JSON should be of the following schema:
        {{  
            "title": "string",
            "summary": "string"
        }}

        Below is an example of the JSON format:
        {{
            "title": "Title of the Article",
            "summary": "Summary of the Article"
        }}
        """

def set_takeaway_prompt(article):
    return f"""
        Article:
        {article}
        ----

        You will extract increasingly concise, relevant Takeaways of the
        above Article and rewrite in a simple and concise manner.

        Guidelines:
        - Focus on the most important points, insights, or lessons discussed in the episode. 
        - Paraphrase the key takeaways, making them simpler to understand and more concise. 
        - Ensure that the core message of each takeaway is preserved while using clear and straightforward language.
        - Return the result in the following JSON format:
        {{
            "takeaways": "list of strings"
        }}
        """


def set_summary_prompt(article):
    return f"""
        Article:
        {article}
        ----

        You will generate increasingly concise, entity-dense summaries of the
        above Article and also a title for the Article.

        Repeat the following 2 steps 5 times.

        - Step 1: Identify 1-3 informative Entities from the Article
        which are missing from the previously generated summary and are the most
        relevant.

        - Step 2: Write a new, denser summary of identical length which covers
        every entity and detail from the previous summary plus the missing
        entities.

        A Missing Entity is:

        - Relevant: to the main story
        - Specific: descriptive yet concise (5 words or fewer)
        - Novel: not in the previous summary
        - Faithful: present in the Article
        - Anywhere: located anywhere in the Article

        Guidelines:
        - The first summary should be long (4-5 sentences, approx. 80 words) yet
        highly non-specific, containing little information beyond the entities
        marked as missing.

        - Use overly verbose language and fillers (e.g. "this article discusses")
        to reach approx. 80 words.

        - Make every word count: re-write the previous summary to improve flow and
        make space for additional entities.

        - Make space with fusion, compression, and removal of uninformative
        phrases like "the article discusses"

        - The summaries should become highly dense and concise yet
        self-contained, e.g., easily understood without the Article.

        - Missing entities can appear anywhere in the new summary.

        - Never drop entities from the previous summary. If space cannot be made,
        add fewer new entities.

        > Remember to use the exact same number of words for each summary.
        Answer in JSON.

        > The JSON in `summaries_per_step` should be a list (length 5) of the following schema:
        {{  
            "title": "string",
            "summaries_per_step": [{{
                "missing_entities": "list of strings",
                "denser_summary": "string"
            }}]
        }}
        """