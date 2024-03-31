import redis
import os
from fastapi import APIRouter
from typing import Any

# Initialize FastAPI router
routes = APIRouter(prefix="/api/blogs")

# Connect to Redis database
redis_host = os.environ.get("REDIS_HOST", "0.0.0.0")
redis_client = redis.Redis(host=redis_host, port=6379, decode_responses=True)

# Route to retrieve notifications for all blogs
@routes.get("/notifications")
def get_notifications() -> Any:
    # Search for new blog notifications
    pattern = 'new:blog:*'
    uuids = redis_client.scan_iter(pattern)

    # Retrieve blog data for each matching key
    blogs = [redis_client.hgetall(blog_id) for blog_id in uuids]

    # Return blog data
    return {'data': blogs}

# Route to retrieve notifications for comments on a specific blog
@routes.get("/{blog_id}/comments/notifications")
def get_blog_notification(blog_id: str) -> Any:
    # Search for new comment notifications for a specific blog
    pattern = f'new:comment:{blog_id}:*'
    uuids = redis_client.scan_iter(pattern)

    # Retrieve comment data for each matching key
    comments = [redis_client.hgetall(comment_id) for comment_id in uuids]

    # Return comment data
    return {'data': comments}
