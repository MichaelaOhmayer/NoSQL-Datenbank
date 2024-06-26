FROM python:3.12

WORKDIR /app
COPY . .

RUN pip install --no-cache-dir -r api/requirements.txt

EXPOSE 8081

CMD ["uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "8081"]