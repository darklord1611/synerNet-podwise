from groq import Groq
from config import GROQ_API_KEY, MODEL_NAME
from utils.entities import Keypoint, Subpoint
import json
import textgrad as tg
from langchain_groq import ChatGroq

class KeypointPipeline:
  
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

        You will extract relevant Keypoints of the above Article.

        A Keypoint is:

        - Relevant: to the main story
        - Descriptive: concise and informative
        - Faithful: present in the Article
        - Anywhere: located anywhere in the Article

        Guidelines:
        - Focus on the main ideas, important topics, and significant insights discussed throughout the Article.
        - Ignore small talk, filler words, or off-topic sections.
        - Summarize the core content in clear and concise key points.

        Answer in JSON.
        - Return the result in the following JSON format:
        {{
            "title": "string",
            "timestamp": "string",
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
          "title": "Mindfulness Techniques",
          "timestamp": 345,
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
    

  def _set_evaluation_instruction(self, article):
    self.evaluation_instruction = f"""
        Here's an article: 
        {article}
        ----
        You will given a JSON object containing a list of topics like this example:
        {{
            "title": "string",
            "timestamp": "string",
            "subtopics": [
                {{
                    "title": "string",
                }},
                ...
            ]
        }}
        Evaluate all given keypoints. The keypoints should be relevant to the article. Be smart, logical, and very critical. Just provide concise feedback.
        """

  def extract_keypoints(self, article):
    
    self._set_prompt(article)

    chat_completion = self.client.chat.completions.create(
      messages=[
            {
                "role": "system",
                "content": "You are an expert podcast analyst in extracting relevant keypoints from a podcast episode and providing the response in JSON.\n"
                # Pass the json schema to the model. Pretty printing improves results.
                f" The JSON object must use the schema: {json.dumps(Keypoint.model_json_schema(), indent=2)}",
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
      keypoint_collection = Keypoint.model_validate_json(chat_completion.choices[0].message.content)
    except Exception as e:
      print(e)
      return {"error": "Invalid JSON response from the model."}
    

    # res = self._optimize_keypoint_extraction(article, chat_completion.choices[0].message.content)

    # print(res)

    return keypoint_collection.points
  

  def _optimize_keypoint_extraction(self, original_input, initial_keypoints):
    input_keypoints = tg.Variable(initial_keypoints,
                       role_description="initial summary for LLM to evaluate",
                       requires_grad=True)
    self._set_evaluation_instruction(original_input)
    self.optimizer = tg.TGD(parameters=[input_keypoints])


    # TextLoss is a natural-language specified loss function that describes
    # how we want to evaluate the reasoning.
    loss_fn = tg.TextLoss(self.evaluation_instruction)

    # Step 3: Do the loss computation, backward pass, and update the punchline.
    # Exact same syntax as PyTorch!
    loss = loss_fn(input_keypoints)
    loss.backward()
    self.optimizer.step()
    
    return input_keypoints.value
