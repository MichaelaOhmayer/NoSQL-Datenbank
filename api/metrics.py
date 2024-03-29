import redis
import os

from fastapi import APIRouter
from typing import Any

routes = APIRouter(prefix="/api/metrics")

redis_host = os.environ.get("REDIS_HOST", "0.0.0.0")
redis_client = redis.Redis(host=redis_host, port=6379, decode_responses=True)

@routes.get("")
def get() -> Any:
  # Count blogs.
  cnt_blogs = redis_client.scard('blogs')

  # Count comments and vistors.
  cnt_comments, cnt_vistors = 0, 0

  blog_ids = redis_client.sscan_iter('blogs')
  for blog_id in blog_ids:
    visitors = redis_client.hget(f'blog:{blog_id}', 'visitors')
    cnt_vistors += int(visitors)

    comments = redis_client.scard(f'blog:{blog_id}:comments')
    cnt_comments += int(comments)
  
  coutner = {
    'blogs': cnt_blogs,
    'comments': cnt_comments,
    'visitors': cnt_vistors
  }

  return { 'data': coutner }