#!/bin/bash

# Execute bentoML serve
# "uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8082"

uvicorn app:app --reload --port 8003