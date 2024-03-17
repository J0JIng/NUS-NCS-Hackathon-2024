FROM alpine:3

RUN apk update && apk upgrade

RUN apk add --no-cache sqlite python3 py3-pip python3-dev gcc libc-dev linux-headers

WORKDIR /app

COPY . .

RUN apk add --no-cache python3-dev && \
    python3 -m venv venv && \
    source venv/bin/activate && \
    pip install --upgrade pip && \
    pip install -r requirements.txt

CMD ["python", "./AI/DB_schema.py"]


