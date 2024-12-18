import json
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException, Body
from pydantic import BaseModel
from chatbot import handle_question
from chatbot import supabase
from ChunkSupabase import  transform, create_chunk_for_rag

# Khởi tạo ứng dụng FastAPI
app = FastAPI()
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Định nghĩa schema đầu vào cho API
class QuestionRequest(BaseModel):
    question: str

@app.get('/')
async def index():
    return {'message': 'Hello World'}

# Định nghĩa endpoint chính để xử lý câu hỏi
@app.post("/ask-question")
async def ask_question(request: QuestionRequest):
    user_question = request.question

    try:
        # Gọi hàm xử lý câu hỏi
        answer, contextChatbot = handle_question(user_question)
        return {"answer": answer, "context": contextChatbot}
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

@app.post("/load-context")
async def load_context(id: str = Body(..., embed=True)):
    response_transcript = (
        supabase.table("episode_summaries")
        .select("transcript")
        .eq("id", int(id))
        .execute()
    )

    response_summary = (
        supabase.table("episode_summaries")
        .select("summary")
        .eq("id", int(id))
        .execute()
    )
    print("response_summary", response_summary)
    out_transcript = transform(response_transcript.data)
    chunks = create_chunk_for_rag(out_transcript, 250)
    with open("chunks.json", "w") as f:
        json.dump(chunks, f, indent=4)
    with open("summary.json", "w") as f:
        json.dump(response_summary.data[0]['summary']['summary'], f, indent=4)

