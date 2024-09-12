from groq import Groq
from config import GROQ_API_KEY, MODEL_NAME
from utils.entities import Keyword, KeywordCollection
import json
import textgrad as tg

class KeywordPipeline:
  
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

  def _set_evaluation_instruction(self, article):
    self.evaluation_instruction = f"""
        Here's an article: 
        {article}
        ----
        You will given a JSON object containing a list of keywords and their definitions like this example:
        {{
            "keywords": [
                {{
                    "word": "string",
                    "definition": "string"
                }},
            ]
        }}
        Evaluate all given keywords. The keywords should be present and relevant to the article and their definitions should be accurate and detailed, considering the context of the article. Be smart, logical, and very critical. Just provide concise feedback.
        """
    
  
  def extract_keywords(self, article):
    
    self._set_prompt(article)

    chat_completion = self.client.chat.completions.create(
      messages=[
            {
                "role": "system",
                "content": "You are an expert text analyst that specializes in extracting relevant keywords from a paragraph and providing the response in JSON.\n"
                # Pass the json schema to the model. Pretty printing improves results.
                f" The JSON object must use the schema: {json.dumps(KeywordCollection.model_json_schema(), indent=2)}",
            },
            {
                "role": "user",
                "content": self.prompt,
            }
      ],
      model=MODEL_NAME,
      temperature=0,
      stream=False,
      response_format={"type": "json_object"},
    )

    print(chat_completion.choices[0].message.content)
    try:
      keyword_collection = KeywordCollection.model_validate_json(chat_completion.choices[0].message.content)
    except Exception as e:
      print(e)
      return {"error": "Invalid JSON response from the model."}
    

    # res = self._optimize_keyword_extraction(article, chat_completion.choices[0].message.content)

    # print(res)

    return keyword_collection.keywords
  

  def _optimize_keyword_extraction(self, original_input, initial_keywords):
    input_keywords = tg.Variable(initial_keywords,
                       role_description="initial summary for LLM to evaluate",
                       requires_grad=True)
    self._set_evaluation_instruction(original_input)
    self.optimizer = tg.TGD(parameters=[input_keywords])


    # TextLoss is a natural-language specified loss function that describes
    # how we want to evaluate the reasoning.
    loss_fn = tg.TextLoss(self.evaluation_instruction)

    # Step 3: Do the loss computation, backward pass, and update the punchline.
    # Exact same syntax as PyTorch!
    loss = loss_fn(input_keywords)
    loss.backward()
    self.optimizer.step()
    
    return input_keywords.value
