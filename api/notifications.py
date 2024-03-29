import redis
import os

from fastapi import APIRouter
from typing import Any

routes = APIRouter(prefix="/api/blogs")

redis_host = os.environ.get("REDIS_HOST", "0.0.0.0")
redis_client = redis.Redis(host=redis_host, port=6379, decode_responses=True)

@routes.get("/notifications")
def get_notifications() -> Any:
  pattern = 'new:blog:*'

  uuids = redis_client.scan_iter(pattern)
  blogs = [ redis_client.hgetall(blog_id) for blog_id in uuids ]

  return { 'data': blogs }

@routes.get("/{blog_id}/comments/notifications")
def get_blog_notification(blog_id: str) -> Any:
  patern = f'new:comment:{blog_id}:*'

  uuids = redis_client.scan_iter(patern)
  comments = [ redis_client.hgetall(comment_id) for comment_id in uuids ]

  return { 'data': comments }