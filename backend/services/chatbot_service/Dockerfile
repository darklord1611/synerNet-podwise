# Sử dụng image python chính thức
FROM python:3.10-slim

# Cài đặt các công cụ cần thiết
RUN apt-get update && apt-get install -y build-essential

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép file requirements.txt vào container
COPY requirements.txt .

# Cài đặt các thư viện Python từ requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Sao chép toàn bộ nội dung dự án vào container
COPY . .

# Khai báo port ứng dụng sẽ chạy
EXPOSE 8087

# Khởi chạy ứng dụng với Uvicorn
CMD ["uvicorn", "main:app", "--port", "8087"]