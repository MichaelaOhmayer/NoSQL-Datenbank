from fastapi import FastAPI
from api import blog, comments, metrics, notifications

app = FastAPI()
app.include_router(notifications)
app.include_router(metrics)
app.include_router(blog)
app.include_router(comments)
