
# Project Title

A brief description of what this project does and who it's for

## Environment Variables

To run this service, you will need to add the following environment variables to your .env file

```
OPENAI_API_KEY=
GROQ_API_KEY=
GROQ_MODEL_NAME=
SUPABASE_URL=
SUPABASE_KEY=
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

Start the server at http://localhost:8001

```bash
  source start.sh
```

