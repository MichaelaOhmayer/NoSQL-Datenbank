from fastapi import FastAPI
from api import blog, comments, metrics, notifications
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["POST", "GET", "DELETE", "PUT"],
    allow_headers=["*"],
)
app.include_router(notifications)
app.include_router(metrics)
app.include_router(blog)
app.include_router(comments)