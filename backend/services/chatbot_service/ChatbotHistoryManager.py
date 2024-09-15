import requests
from groq import Groq
from config import GROQ_API_KEY
import os

class ChatbotHistoryManager:
    def __init__(self, window_size=8, max_tokens=4096, groq_api_key=GROQ_API_KEY):
        self.window_size = window_size
        self.max_tokens = max_tokens
        self.groq_api_key = groq_api_key
        self.history = []

    def add_conversation(self, user_message, agent_response):
        self.history.append({"user": user_message, "agent": agent_response})
        if len(self.history) > self.window_size:
            self.history = self.history[-self.window_size:]

        total_tokens = self.get_token_count()
        if total_tokens > self.max_tokens:
            print("Token vượt quá giới hạn, tóm tắt lại lịch sử hội thoại...")
            self.summarize_history()


    def get_token_count(self):
        # Tính tổng số token từ lịch sử hội thoại
        prompt = self.generate_prompt_from_history()
        # Đếm số lượng token bằng cách chia theo khoảng trắng
        return len(prompt.split())

    def summarize_history(self):
        prompt = self.generate_prompt_from_history()

        client = Groq(api_key=self.groq_api_key)
        chat_completion = client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model="llama3-8b-8192",
            temperature=0,
            max_tokens=512
        )

        summary = chat_completion.choices[0].message.content
        print(">>>>>>>>>>>>summary", summary)
        self.history = [{'user': '', 'agent': summary}]

    def generate_prompt_from_history(self):
        # Kết hợp lịch sử các câu hội thoại thành prompt
        prompt = ""
        for interaction in self.history:
            prompt += f"User: {interaction['user']}, Agent: {interaction['agent']}. "
        return prompt

    def get_new_prompt(self, new_user_message):
        # Khởi tạo prompt với instruction rõ ràng cho LLM
        prompt = f"""The Podwise AI assistant is tasked with answering questions based on the previous conversation and relevant documents. Use the conversation history below to generate a helpful response.\nConversation History:{self.generate_prompt_from_history()}"""

        # Thêm câu hỏi mới của người dùng vào prompt
        prompt += f"\nUser's new question: {new_user_message}\n"

        return prompt


# test = ChatbotHistoryManager()
