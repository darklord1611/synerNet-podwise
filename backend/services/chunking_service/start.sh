#!/bin/bash

docker build -t chunking_service .
# Docker run command to start the container with GPU support
docker run --gpus all -p 8000:8000 chunking_service