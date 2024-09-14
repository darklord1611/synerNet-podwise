# Use an official PyTorch image as the base
FROM pytorch/pytorch:2.0.1-cuda11.7-cudnn8-runtime

# Set environment variables
ENV PYTHONUNBUFFERED=1
# ENV KAGGLE_USERNAME=<YOUR_KAGGLE_USERNAME>
# ENV KAGGLE_KEY=<YOUR_KAGGLE_API_KEY>

# Set the working directory in the container
WORKDIR /app

# Install necessary tools
RUN apt-get update && apt-get install -y unzip

# Install Python dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Install Kaggle API
RUN pip install kaggle

# Download and unzip the Kaggle dataset
RUN kaggle datasets download -d nhddddz84/miniseg-cp-final -p /app/
RUN unzip /app/miniseg-cp-final.zip -d /app/ && rm /app/miniseg-cp-final.zip

# Copy the application code into the container
COPY . /app/

# Expose the port the app runs on
EXPOSE 8000

# Run the application
CMD ["python", "main.py"]
