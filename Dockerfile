FROM python:3.8-slim-buster
WORKDIR /app
RUN pip install rasa==3.6.0
COPY . /app
EXPOSE 5005
CMD ["rasa", "shell"]