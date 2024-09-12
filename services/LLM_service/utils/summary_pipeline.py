from groq import Groq
from config import GROQ_API_KEY, MODEL_NAME
from utils.entities import Summary, SummaryCollection, TakeawayCollection, BackupSummary
import json
import textgrad as tg

class SummaryPipeline:
  
  def __init__(self):
    self.client = Groq(
      api_key=GROQ_API_KEY,
    )
    # set the backward model to evaluate the summaries
    tg.set_backward_engine("groq-llama-3.1-70b-versatile", override=True)


  def _set_prompt(self, article):
    self.gen_takeaway_prompt = f"""
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

    self.gen_summary_prompt = f"""
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
    self.backup_prompt = f"""
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


  def _set_evaluation_instruction(self, article):
    self.evaluation_instruction = f"""
        Here's a paragraph of text: {article}. Evaluate any given summary of this article, be smart, logical, and very critical. Just provide concise feedback.
        """
    

  def extract_takeaways(self, article):
      
      self._set_prompt(article)
  
      chat_completion = self.client.chat.completions.create(
        messages=[
              {
                  "role": "system",
                  "content": "You are an expert podcast analyst in extracting takeaway messages from a podcast episode and providing them in JSON.\n"
                  # Pass the json schema to the model. Pretty printing improves results.
                  f" The JSON object must use the schema: {json.dumps(TakeawayCollection.model_json_schema(), indent=2)}",
              },
              {
                  "role": "user",
                  "content": self.gen_takeaway_prompt,
              }
        ],
        model=MODEL_NAME,
        temperature=0,
        stream=False,
        response_format={"type": "json_object"},
      )
      print(chat_completion.choices[0].message.content)
      try:
        takeaway_collection = TakeawayCollection.model_validate_json(chat_completion.choices[0].message.content)
      except Exception as e:
        print("Error")
        return {"error": "Invalid JSON response from the model."}
      return takeaway_collection.takeaways


  def generate_summary(self, article):
    chat_completion = self.client.chat.completions.create(
      messages=[
            {
                "role": "system",
                "content": "You are an expert podcast analyst in summarizing the content of a podcast episode and providing the summary in JSON.\n"
                # Pass the json schema to the model. Pretty printing improves results.
                f" The JSON object must use the schema: {json.dumps(SummaryCollection.model_json_schema(), indent=2)}",
            },
            {
                "role": "user",
                "content": self.gen_summary_prompt,
            }
      ],
      model=MODEL_NAME,
      temperature=0,
      stream=False,
      response_format={"type": "json_object"},
    )

    return chat_completion.choices[0].message.content

  def generate_backup_summary(self, article):
    chat_completion = self.client.chat.completions.create(
      messages=[
            {
                "role": "system",
                "content": "You are an expert podcast analyst in summarizing the content of a podcast episode and providing the summary in JSON.\n"
                # Pass the json schema to the model. Pretty printing improves results.
                f" The JSON object must use the schema: {json.dumps(BackupSummary.model_json_schema(), indent=2)}",
            },
            {
                "role": "user",
                "content": self.backup_prompt,
            }
      ],
      model=MODEL_NAME,
      temperature=0,
      stream=False,
    )


    return chat_completion.choices[0].message.content



  def summarize(self, article, optimize=False):
    
    self._set_prompt(article)


    try:
      summary_collection = SummaryCollection.model_validate_json(self.generate_summary(article))

      summary_count = len(summary_collection.summaries_per_step)
      # take the most dense summary
      initial_summary = summary_collection.summaries_per_step[summary_count - 1].denser_summary
      title = summary_collection.title
    except Exception as e:
      summary_collection = BackupSummary.model_validate_json(self.generate_backup_summary(article))

      initial_summary = summary_collection.summary
      title = summary_collection.title
    
    if optimize:
      final_summary = self._optimize_summary(article, initial_summary)
    else:
      final_summary = initial_summary
    
    return final_summary, title
  

  def _optimize_summary(self, original_input, initial_summary):
    input_summary = tg.Variable(initial_summary,
                       role_description="initial summary for LLM to evaluate",
                       requires_grad=True)
    self._set_evaluation_instruction(original_input)
    self.optimizer = tg.TGD(parameters=[input_summary])


    # TextLoss is a natural-language specified loss function that describes
    # how we want to evaluate the reasoning.
    loss_fn = tg.TextLoss(self.evaluation_instruction)

    # Step 3: Do the loss computation, backward pass, and update the punchline.
    # Exact same syntax as PyTorch!
    loss = loss_fn(input_summary)
    loss.backward()
    self.optimizer.step()
    
    return input_summary.value
