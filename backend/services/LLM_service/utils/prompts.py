def set_keyword_prompt(article):
    return f"""
        Episode:
        {article}
        ----

        You will extract increasingly concise, relevant keywords of the
        above Episode and provide a definition for each keyword.

        Execute the following 2 steps.

        - Step 1: Identify the most informative and relevant Keywords from the Episode.

        - Step 2: For each Keyword, provide an accurate and detailed definition, taken into account the context of the Episode.

        A Keyword is:

        - Relevant: to the main story
        - Specific: descriptive yet concise (3 words or fewer)
        - Faithful: present in the Episode
        - Anywhere: located anywhere in the Episode

        Guidelines:
        - Extract only the sophisticated or advanced keywords from the Episode. 
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
        Episode:
        {article}
        ----

        You will extract relevant Highlights of the above Episode.

        A Highlight is:

        - Relevant: to the main story
        - Faithful: present in the Episode
        - Anywhere: located anywhere in the Episode

        Guidelines:
        - Provide the exact text of the highlight in the Episode (keep it concise, ideally a few sentences).
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
        Episode:
        {article}
        ----

        You will extract a relevant Keypoint that consists of several points of the above Episode.

        A Point is:

        - Relevant: to the main story
        - Descriptive: relevant and informative
        - Faithful: present in the Episode
        - Anywhere: located anywhere in the Episode

        Guidelines:
        - Focus on the main ideas, important topics, and significant insights discussed throughout the Episode.
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
        Episode:
        {article}

        ----
        You will generate a concise, relevant summary and a title of the
        above Episode.


        Answer in JSON.

        > The JSON should be of the following schema:
        {{  
            "title": "string",
            "summary": "string"
        }}

        Below is an example of the JSON format:
        {{
            "title": "Title of the Episode",
            "summary": "Summary of the Episode"
        }}
        """


def set_combine_chunks_prompt(summaries):
    chunk_str = ["Paragraph " + str(i) + ": \n" + summaries[i] + "\n" for i in range(len(summaries))]

    paragraphs = "\n\n".join(chunk_str)

    return f"""
{paragraphs}

You will analyze a series of paragraphs above from a podcast transcript, labeled as Paragraph 0, Paragraph 1, ... Paragraph N. Your task is to combine semantically similar paragraphs in sequential order and generate appropriate titles for these combinations.


Guidelines:
1. Carefully analyze the content and context of each paragraph.
2. Combine adjacent paragraphs that share common themes, topics, or narrative threads.
3. Create concise, informative titles for each combined section that accurately capture the main idea or theme.
4. Paragraphs must be combined in strict sequential order. Never combine non-adjacent paragraphs.
5. Each paragraph should be used exactly once in your combinations.

Output Format:
Provide your analysis in the following JSON format:

{{
    "combination": [
        {{
            "paragraph_indexes": [0, 1, ...],
            "title": "string",
        }},
        ...
    ]
}}

Notes:
- "paragraph_indexes" must be a list of consecutive integers.
- The first "paragraph_indexes" in a combination must directly follow the last "paragraph_indexes" of the previous combination.
- For standalone paragraphs, "paragraph_indexes" will contain only one index.
- Ensure that your combinations account for all paragraphs from 0 to N, without skipping any.

Example of correct ordering:
[0, 1], [2], [3, 4, 5], [6], ...

Examples of incorrect ordering:
[0, 2], [1, 3], ...  // Non-adjacent paragraphs combined
[0, 1], [3, 4], ...  // Paragraph 2 skipped

Remember, the goal is to create meaningful, coherent sections that accurately represent the content and structure of the podcast transcript while strictly maintaining the original paragraph order.
    """


def set_takeaway_prompt(article):
    return f"""
        Episode:
        {article}
        ----

        You will extract increasingly concise, relevant Takeaways of the
        above Episode and rewrite in a simple and concise manner.

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
        Episode:
        {article}
        ----

        You will generate increasingly concise, entity-dense summaries of the
        above Episode and also a title for the Episode.

        Repeat the following 2 steps 5 times.

        - Step 1: Identify 1-3 informative Entities from the Episode
        which are missing from the previously generated summary and are the most
        relevant.

        - Step 2: Write a new, denser summary of identical length which covers
        every entity and detail from the previous summary plus the missing
        entities.

        A Missing Entity is:

        - Relevant: to the main story
        - Specific: descriptive yet concise (5 words or fewer)
        - Novel: not in the previous summary
        - Faithful: present in the Episode
        - Anywhere: located anywhere in the Episode

        Guidelines:
        - The first summary should be long (4-5 sentences, approx. 80 words) yet
        highly non-specific, containing little information beyond the entities
        marked as missing.

        - Use overly verbose language and fillers (e.g. "this episode discusses")
        to reach approx. 80 words.

        - Make every word count: re-write the previous summary to improve flow and
        make space for additional entities.

        - Make space with fusion, compression, and removal of uninformative
        phrases like "the episode discusses"

        - The summaries should become highly dense and concise yet
        self-contained, e.g., easily understood without the Episode.

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