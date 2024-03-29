import redis
import os
import uuid

from datetime import datetime
from fastapi import APIRouter, Header, HTTPException, Response
from typing import Any, Union, Annotated

from api import Comment, is_admin

routes = APIRouter(prefix="/api/blogs/{blog_id}/comments")

redis_host = os.environ.get("REDIS_HOST", "0.0.0.0")
redis_client = redis.Redis(host=redis_host, port=6379, decode_responses=True)

@routes.get("")
def get_all(blog_id: str) -> Any:
  validate_blog(blog_id)

  uuids = redis_client.sscan_iter(f'blog:{blog_id}:comments')
  comments = [ dict(redis_client.hgetall(f'comment:{comment_id}')) for comment_id in uuids ]

  return { 'data': comments }

@routes.post("", status_code=201)
def create(blog_id: str, comment: Comment, res: Response) -> Any:
  validate_blog(blog_id)

  comment.uuid = str(uuid.uuid4())
  comment.created = str(datetime.now())
  
  # Create comment hash set and add to set of comment ids. 
  redis_client.sadd(f'blog:{blog_id}:comments', comment.uuid)
  redis_client.hset(f'comment:{comment.uuid}', mapping=dict(comment))

  # Create a notification by adding a new key for 5 minutes.
  key = f'new:comment:{blog_id}:{comment.uuid}'
  redis_client.hset(key, mapping=dict(comment))
  redis_client.expire(key, 60 * 5)

  return comment

@routes.delete("/{comment_id}", status_code=204)
def delete(blog_id: str, comment_id: str,  authorization: Annotated[Union[str, None], Header()] = ""):  
  # Evaluate if admin key is provided in header.
  is_admin(authorization)
  validate_blog(blog_id)
  
  # Delete the comment from the hash and set.
  hit = redis_client.srem(f'blog:{blog_id}:comments', comment_id)
  if not hit: 
    raise HTTPException(status_code=404, detail=f"Comment with id '{comment_id}' does not exist")

  redis_client.delete(f'comment:{blog_id}')

  # Delete from new comments if still exists.
  redis_client.delete(f'new:comment:{blog_id}:{comment_id}')

# Check the existance of a blog with a given id.
def validate_blog(blog_id: str) -> None :
  hit = redis_client.sismember('blogs', blog_id)
  if not hit:
    raise HTTPException(status_code=404, detail=f"blog with id '{blog_id}' not found")