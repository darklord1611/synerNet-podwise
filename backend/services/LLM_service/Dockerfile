
FROM python:3.10.14


WORKDIR /code


COPY ./requirements.txt /code/requirements.txt


RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt


COPY . /code

CMD ["bentoml", "serve", "service:LLMService", "--port", "8001"]