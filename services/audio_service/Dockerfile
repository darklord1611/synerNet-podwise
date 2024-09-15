# Sử dụng image python chính thức
FROM python:3.10-slim

# Đặt thư mục làm việc bên trong container
WORKDIR /app

# Sao chép file yêu cầu của dự án
COPY requirements.txt /app/

# Cài đặt các thư viện cần thiết
RUN pip install --no-cache-dir -r requirements.txt

# Sao chép toàn bộ mã nguồn vào thư mục /app
COPY . /app

# Mở cổng 8082 để chạy server
EXPOSE 8082

# Lệnh để khởi động ứng dụng FastAPI
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8082"]