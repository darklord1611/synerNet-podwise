from groq import Groq
from config import GROQ_API_KEY, MODEL_NAME
from utils.entities import HighlightCollection, Keypoint, KeywordCollection, Summary, SummaryCollection, TakeawayCollection, BackupSummary

from utils.prompts import set_backup_summary_prompt, set_highlight_prompt, set_keypoint_prompt, set_keyword_prompt, set_summary_prompt, set_takeaway_prompt

import json
import textgrad as tg

class LLMPipeline:
  
  def __init__(self):
    self.client = Groq(
      api_key=GROQ_API_KEY,
    )
    # set the backward model to evaluate the summaries
    tg.set_backward_engine("groq-llama-3.1-70b-versatile", override=True)

    self.role_prompts = {
      "keywords": "You are an expert text analyst that specializes in extracting relevant keywords from a paragraph and providing the response in JSON.",
      "highlights": "You are an expert podcast analyst that specializes in extracting relevant highlights from the transcript of a podcast episode and providing the response in JSON.",
      "keypoints": "You are an expert podcast analyst in extracting relevant keypoints from a podcast episode and providing the response in JSON.",
      "summary": "You are an expert podcast analyst in summarizing the content of a podcast episode and providing the summary in JSON.",
      "takeaways": "You are an expert podcast analyst in extracting takeaway messages from a podcast episode and providing them in JSON.",
    }

    return None
  

  def get_role_prompt(self, task):
    return self.role_prompts.get(task, None)
  
  def get_model_schema(self, task):
    if task == "keywords":
      return json.dumps(KeywordCollection.model_json_schema(), indent=2)
    elif task == "highlights":
      return json.dumps(HighlightCollection.model_json_schema(), indent=2)
    elif task == "keypoints":
      return json.dumps(Keypoint.model_json_schema(), indent=2)
    elif task == "summary":
      return json.dumps(SummaryCollection.model_json_schema(), indent=2)
    elif task == "backup_summary":
      return json.dumps(BackupSummary.model_json_schema(), indent=2)
    elif task == "takeaways":
      return json.dumps(TakeawayCollection.model_json_schema(), indent=2)
    return None
  
  def set_prompt(self, article, task):
    match(task):
        case "keywords":
            return set_keyword_prompt(article)
        case "highlights":
            return set_highlight_prompt(article)
        case "keypoints":
            return set_keypoint_prompt(article)
        case "summary":
            return set_summary_prompt(article)
        case "backup_summary":
            return set_backup_summary_prompt(article)
        case "takeaways":
            return set_takeaway_prompt(article)
       

  def _set_evaluation_instruction(self, task, article):
    self.evaluation_instruction = f"""
        Here's a paragraph of text: {article}. Evaluate any given {task} of this article, be smart, logical, and very critical. Just provide concise feedback.
        """
    return None

  def generate_content(self, task, prompt):
    chat_completion = self.client.chat.completions.create(
      messages=[
            {
                "role": "system",
                "content": f"{self.get_role_prompt(task)}\n"
                # Pass the json schema to the model. Pretty printing improves results.
                f" The JSON object must use the schema: {self.get_model_schema(task)}",
            },
            {
                "role": "user",
                "content": prompt,
            }
      ],
      model=MODEL_NAME,
      temperature=0,
      stream=False,
      response_format={"type": "json_object"},
    )

    return chat_completion.choices[0].message.content
  
  def extract_takeaways(self, article):
      
      prompt = self.set_prompt(article, task = "takeaways")
  
      try:
        content = self.generate_content(task = "takeaways", prompt = prompt)
        takeaway_collection = TakeawayCollection.model_validate_json(content)
      except Exception as e:
        print(e)
        return {"error": "Invalid JSON response from the model."}
      return takeaway_collection.takeaways
  
  def extract_keywords(self, article):

    prompt = self.set_prompt(article, task = "keywords")

    try:
      content = self.generate_content(task = "keywords", prompt = prompt)
      keyword_collection = KeywordCollection.model_validate_json(content)
    except Exception as e:
      print(e)
      return {"error": "Invalid JSON response from the model."}

    return keyword_collection.keywords
  
  def extract_highlights(self, article):
        
    prompt = self.set_prompt(article, task = "highlights")

    try:
        content = self.generate_content(task = "highlights", prompt = prompt)
        highlight_collection = HighlightCollection.model_validate_json(content)
    except Exception as e:
        print(e)
        return {"error": "Invalid JSON response from the model."}
    
    return highlight_collection.highlights
  
  def extract_keypoints(self, article):
        
    prompt = self.set_prompt(article, task = "keypoints")

    try:
        content = self.generate_content(task = "keypoints", prompt = prompt)
        keypoint_collection = Keypoint.model_validate_json(content)
    except Exception as e:
        print(e)
        return {"error": "Invalid JSON response from the model."}
    
    return keypoint_collection

  def summarize(self, article, optimize=False):
    
    prompt = self.set_prompt(article, task = "summary")

    try:
      content = self.generate_content(task = "summary", prompt = prompt)
      summary_collection = SummaryCollection.model_validate_json(content)

      summary_count = len(summary_collection.summaries_per_step)
      # take the most dense summary
      initial_summary = summary_collection.summaries_per_step[summary_count - 1].denser_summary
      title = summary_collection.title

    except Exception as e:
      backup_prompt = self.set_prompt(article, task = "backup_summary")
      content = self.generate_content(task = "backup_summary", prompt = backup_prompt)

      summary_collection = BackupSummary.model_validate_json(content)

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
    self._set_evaluation_instruction(task = "summary", article = original_input)
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
