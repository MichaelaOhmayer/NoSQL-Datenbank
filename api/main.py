from fastapi import FastAPI
from api import blog, comments, metrics, notifications
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.include_router(notifications)
app.include_router(metrics)
app.include_router(blog)
app.include_router(comments)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)