import json
import torch
import numpy as np
import requests
import faiss
import os
from sklearn.metrics.pairwise import cosine_similarity
from groq import Groq
from ChatbotHistoryManager import ChatbotHistoryManager
from sentence_transformers import SentenceTransformer
from supabase import create_client, Client
from config import SUPABASE_URL, SUPABASE_KEY, GROQ_API_KEY



supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
# Memory
chat_memory = ChatbotHistoryManager(window_size=8, max_tokens=4096)


global_system_prompt = """
You are Podwise AI, a highly specialized assistant for answering podcast-related questions. Always respond as Podwise AI if asked, and ensure that your answers are tailored to the user's query based on the podcast metadata and general information about the podcast industry. 
Always be concise and respectful. 
If asked about your identity, respond as Podwise AI, and emphasize that you are designed to enhance podcast interaction and content delivery.
"""

model = SentenceTransformer('all-MiniLM-L12-v2')
def llm_blog(final_prompt, global_system_prompt, model, temperature):
    client = Groq(
        api_key=GROQ_API_KEY,
    )
    # Gửi request đến API inference của Groq
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": final_prompt,
            },
            {
                "role": "system",
                "content": global_system_prompt
            }
        ],
        model=model,
        temperature=temperature,
    )
    return chat_completion

def retrieval(fileName):
    with open(fileName, 'r') as f:
        data = json.load(f)
    return data

# Hàm tính embedding cho câu hỏi
def get_embedding(question):
    # Xử lý đầu vào nếu là chuỗi văn bản duy nhất
    if isinstance(question, str):
        question = [question]  # Chuyển thành list để phù hợp với phương thức encode

    with torch.no_grad():  # Thêm torch.no_grad() để không cần tính gradient, tiết kiệm bộ nhớ
        embeddings = model.encode(question, convert_to_tensor=True)  # Trả về tensor nếu cần
    return embeddings



# Hàm sinh câu hỏi từ metadata sử dụng API GroqCloud
def generate_pseudo_questions(podcast_metadata, num_questions=10):
    # Tạo prompt dựa trên metadata của podcast
    prompt = f"Generate {num_questions} questions based on the following podcast metadata: {podcast_metadata}"
    chat_completion = llm_blog(prompt, "", "llama-3.1-70b-Versatile", 0)
    # Trích xuất câu hỏi từ kết quả trả về
    questions = chat_completion.choices[0].message.content.split("\n")[:num_questions]

    return questions


def calculate_similarity(user_question_emb, question_group_emb, func):
    # Chuyển embedding của câu hỏi thành numpy array và reshape thành 2D
    user_emb = user_question_emb.detach().cpu().numpy().reshape(1, -1)  # Reshape to (1, feature_dim)

    # Chuyển group thành 2D numpy array nếu chưa phải là 2D
    group_emb = np.array([emb.detach().cpu().numpy().reshape(1, -1) for emb in question_group_emb])  # Reshape to (num_questions, feature_dim)

    # Tính cosine similarity, so sánh giữa user_emb với từng câu trong group_emb
    similarities = cosine_similarity(user_emb, group_emb.squeeze(1))

    return np.mean(similarities) if func=="mean" else np.max(similarities)


# Hàm quyết định route dựa vào điểm similarity
def route_decision(user_question_emb, group1_emb, group2_emb):
    score_group1 = calculate_similarity(user_question_emb, group1_emb, func="max")
    score_group2 = calculate_similarity(user_question_emb, group2_emb, func="mean")

    if score_group1 >= score_group2 and score_group1 >= 0.5:
        return "RAG System"  # Forward tới hệ thống RAG
    else:
        return "LLM"  # Forward tới mô hình LLM trực tiếp


def ann_search(question_embedding, document_embeddings, k=5):
    # Đảm bảo rằng document_embeddings là numpy array và là 2D
    document_embeddings = np.array([embedding.cpu().numpy() for embedding in document_embeddings])  # Chuyển các tensor thành numpy array
    # Loại bỏ chiều dư thừa để đảm bảo document_embeddings có dạng (num_chunks, embedding_dim)
    document_embeddings = np.squeeze(document_embeddings)  # Loại bỏ chiều dư thừa (1) để chuyển thành (num_chunks, embedding_dim)
    # Chuẩn hóa các embeddings để sử dụng cosine similarity (normalize)
    faiss.normalize_L2(document_embeddings)  # Chuẩn hóa các document embeddings để norm = 1
    question_embedding_np = np.array(question_embedding.cpu().numpy()).reshape(1, -1)
    faiss.normalize_L2(question_embedding_np)  # Chuẩn hóa question embedding
    # Tạo FAISS index với Inner Product (IP) để tính Cosine Similarity
    index = faiss.IndexFlatIP(document_embeddings.shape[1])  # Sử dụng Inner Product (IP) thay cho L2
    index.add(document_embeddings)  # Thêm các embedding của tài liệu vào index
    # Tìm k chunk có khoảng cách gần nhất với câu hỏi của người dùng (Cosine Similarity)
    D, I = index.search(question_embedding_np, k)
    return D, I  # Trả về index của các chunk phù hợp và khoảng cách (score)

def retrieve_relevant_chunks(question_embedding, document_embeddings, document_chunks, document_timestamp, k=3):
    # Tìm k chunk có khoảng cách gần nhất
    D, top_k_indices  = ann_search(question_embedding, document_embeddings, k)
    # Lấy các chunk tương ứng với index tìm được
    relevant_chunks = [document_chunks[i] for i in top_k_indices[0]]  # top_k_indices[0] vì FAISS trả về mảng 2D
    # Tạo danh sách ContextChatbot
    ContextChatbot = []
    for x, i in enumerate(top_k_indices[0]):  # x là index trong D[0], i là index của chunk
        chunk = {
            "start": int(document_timestamp[i]),
            "context": document_chunks[i],  # Đảm bảo context là string
            "score": float(D[0][x])  # Đảm bảo score là float
        }
        ContextChatbot.append(chunk)
    json_data = {"context_chatbot": ContextChatbot}
    with open("contextChatbot.json", "w") as f:
        json.dump(json_data, f, indent=4, ensure_ascii=False)

    return relevant_chunks  # Trả về chuỗi JSON



# Bước 3: Ghép chunk vào câu hỏi của người dùng và tạo prompt
def append_chunks_to_prompt(user_question, relevant_chunks):
    history_chat = chat_memory.get_new_prompt(user_question)
    prompt = f"{history_chat}\n\nRelevant information from documents:\n"
    for chunk in relevant_chunks:
        prompt += f"- {chunk}\n"
    return prompt


def process_question_with_rag(user_question):
    document_chunks = []
    document_embeddings = []
    document_timestamp = []
    document = retrieval(fileName="chunks.json")
    for chunk in document:
        document_chunks.append(chunk['text'])
        document_timestamp.append(chunk['start'])
        document_embeddings.append(get_embedding(chunk['text']))

    # Bước 1: Lấy embedding cho câu hỏi người dùng
    user_question_emb = get_embedding(user_question)

    relevant_chunks = retrieve_relevant_chunks(user_question_emb, document_embeddings, document_chunks, document_timestamp, k=3)
    final_prompt = append_chunks_to_prompt(user_question=user_question, relevant_chunks=relevant_chunks)
    chat_completion=llm_blog(final_prompt, global_system_prompt, "llama-3.1-70b-Versatile", 0)
    # Add thêm vào history memory
    chat_memory.add_conversation(user_question, chat_completion.choices[0].message.content)

    # Trả về kết quả
    return chat_completion.choices[0].message.content


# Hàm xử lý câu hỏi với LLM
def process_question_with_llm(user_question):
    history_chat = chat_memory.get_new_prompt(user_question)
    final_prompt = f"{history_chat}"
    chat_completion = llm_blog(final_prompt, global_system_prompt, "llama-3.1-70b-Versatile", 1)
    chat_memory.add_conversation(user_question, chat_completion.choices[0].message.content)

    # Trả về kết quả
    return chat_completion.choices[0].message.content


# Hàm chính để xử lý câu hỏi từ người dùng
def handle_question(user_question):
    # Bước 1: Lấy embedding cho câu hỏi người dùng
    user_question_emb = get_embedding(user_question)
    document = retrieval(fileName="summary.json")
    pseudo_questions_group1 = generate_pseudo_questions(document)
    general_questions_group2 = [
        "How do you usually spend your free time?",
        "Can you recommend a podcast that left a lasting impression on you?",
        "What topics in podcasts do you find most engaging or insightful?",
        "What’s one podcast episode that changed your perspective on something?",
        "How do you discover new podcasts that match your interests?",
        "What do you think makes a podcast host stand out from the rest?",
        "When was the last time a podcast inspired you to take action or try something new?",
        "Do you usually listen to podcasts for entertainment or learning purposes?",
        "How do you balance keeping up with podcasts and your daily activities?",
        "In your opinion, how is the podcasting world evolving with current trends?"
    ]

    # Bước 3: Tính embedding cho các câu hỏi
    group1_emb = [get_embedding(q) for q in pseudo_questions_group1]
    group2_emb = [get_embedding(q) for q in general_questions_group2]

    # Bước 4: Quyết định dựa trên similarity
    decision = route_decision(user_question_emb, group1_emb, group2_emb)

    # Bước 5: Forward tới hệ thống phù hợp
    if decision == "RAG System":
        answer = process_question_with_rag(user_question)
        with open("contextChatbot.json", "r") as file:
            contextChatbot = json.load(file)

        return answer, contextChatbot["context_chatbot"]
    else:
        answer = process_question_with_llm(user_question)
        return answer, []
