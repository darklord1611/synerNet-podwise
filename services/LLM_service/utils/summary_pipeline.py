from groq import Groq
from config import GROQ_API_KEY
from utils.summary import Summary, SummaryCollection
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
    self.prompt = f"""
        Article:
        {article}
        ----

        You will generate increasingly concise, entity-dense summaries of the
        above Article.

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
            "summaries_per_step": [{{
                "missing_entities": "list of strings",
                "denser_summary": "string"
            }}]
        }}
        """

  def _set_evaluation_instruction(self, article):
    self.evaluation_instruction = f"""
        Here's a paragraph of text: {article}. Evaluate any given summary of this article, be smart, logical, and very critical. Just provide concise feedback.
        """
    
  
  def summarize(self, article, return_initial_summary=False):
    
    self._set_prompt(article)

    chat_completion = self.client.chat.completions.create(
      messages=[
            {
                "role": "system",
                "content": "You are an AI assistant that specializes in summarizing paragraphs of text and providing the summary in JSON.\n"
                # Pass the json schema to the model. Pretty printing improves results.
                f" The JSON object must use the schema: {json.dumps(SummaryCollection.model_json_schema(), indent=2)}",
            },
            {
                "role": "user",
                "content": self.prompt,
            }
      ],
      model="llama3-8b-8192",
      temperature=0,
      stream=False,
      response_format={"type": "json_object"},
    )

    try:
      summary_collection = SummaryCollection.model_validate_json(chat_completion.choices[0].message.content)
    except Exception as e:
      print(e)
      return {"error": "Invalid JSON response from the model."}
    summary_count = len(summary_collection.summaries_per_step)

    # take the most dense summary
    initial_summary = summary_collection.summaries_per_step[summary_count - 1].denser_summary

    final_summary = self._optimize_summary(article, initial_summary)

    if return_initial_summary:
      return final_summary, initial_summary
    return final_summary
  

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
