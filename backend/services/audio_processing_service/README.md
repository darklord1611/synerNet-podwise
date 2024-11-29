# Project Title

A brief description of what this project does and who it's for

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DEEPGRAM_API_KEY`

`FFMPEG_PATH`

## Installation

### FFMPEG

Check if already install

```
which ffmpeg
```

Copy the output and set the env variable if found. If not then install then rerun the above command.

```
sudo apt update
sudo apt install ffmpeg
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
