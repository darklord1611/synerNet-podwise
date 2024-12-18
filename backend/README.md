
# Project Title

A brief description of what this project does and who it's for

## Environment Variables

To run this service, you will need to add the following environment variables to your .env file

```
SUPABASE_URL=
SUPABASE_KEY=

# services
AUDIO_SERVICE_URL=http://localhost:8002
CHUNKING_SERVICE_URL=http://localhost:8000
LLM_SERVICE_URL=http://localhost:8001
CHATBOT_SERVICE_URL=http://localhost:8003
```

## Run Locally

Create separate environment

```bash
  python -m venv venv
```

Activate the newly created environment

```bash
  source ./venv/bin/activate 
```

Install dependencies

```bash
  pip install -r requirements.txt
```

Start the server at http://localhost:8080

```bash
  source start.sh
```


For each of the service, you need to follow the instructions at each `services` subfolder.

