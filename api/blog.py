import redis
import os 
import uuid

from datetime import datetime
from fastapi import APIRouter, Header, HTTPException, Response
from typing import Any, Union, Annotated

from api import Blog, is_admin

routes = APIRouter(prefix="/api/blogs")

redis_host = os.environ.get("REDIS_HOST", "0.0.0.0")
redis_client = redis.Redis(host=redis_host, port=6379, decode_responses=True)

@routes.get("")
def get_all(q: Union[str, None] = None) -> Any:
  # Skipping pagination for the sake of brevity.
  uuids = redis_client.sscan_iter("blogs")

  # Interate over list of blogs and add them all to the list.
  blogs = [ redis_client.hgetall(f'blog:{blog_id}') for blog_id in uuids ]

  # If filter is set, exclude all blog titles not matching it.
  if q: 
    blogs = filter(lambda blog: q.lower() in blog['title'].lower() , blogs)

  return {'data': blogs}


@routes.get("/{blog_id}")
def get(blog_id: str) -> Any:
  key = f'blog:{blog_id}'

  # Get all fields from the blog hash, increse block visitor counter.
  blog = redis_client.hgetall(key)
  if not blog:
    raise HTTPException(status_code=404, detail=f"blog with id '{blog_id}' not found")

  redis_client.hincrby(key, 'visitors')

  return { 'data': blog }


@routes.post("", status_code=201)
def create(blog: Blog, res: Response) -> Any:

  blog.uuid = str(uuid.uuid4())
  blog.created = str(datetime.now())

  # Create blog hash and add to set of blog ids.
  redis_client.hset(f'blog:{blog.uuid}', mapping=dict(blog))
  redis_client.sadd('blogs', blog.uuid)

  # Create a notification by adding a new key for 5 minutes.
  redis_client.hset(f'new:blog:{blog.uuid}', mapping=dict(blog))
  redis_client.expire(f'new:blog:{blog.uuid}', 60 * 5)
  
  return { 'blog': blog }


@routes.delete("/{blog_id}", status_code=204)
def delete(blog_id: str, authorization: Annotated[Union[str, None], Header()] = ""):
  # Evaluate if admin key is provided in header.
  is_admin(authorization)

  # Delete the blog comments and references.
  key = f'blog:{blog_id}:comments'
  uuids = redis_client.sscan_iter(key)
  for comment_id in uuids:
    print(comment_id)
    redis_client.srem(key, comment_id)
    redis_client.delete(f'comment:{comment_id}')

  # Delete the blog reference and blog hash.
  hit = redis_client.srem('blogs', blog_id)
  if not hit:
    raise HTTPException(status_code=404, detail=f"entry with id '{blog_id}' not found")

  redis_client.delete(f'blog:{blog_id}')

  # Delete from new blogs if still exists
  redis_client.delete(f'new:blog:{blog_id}')
