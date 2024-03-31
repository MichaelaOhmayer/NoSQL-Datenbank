import redis
import os
from fastapi import APIRouter
from typing import Any

# Initialize FastAPI router
routes = APIRouter(prefix="/api/metrics")

# Connect to Redis database
redis_host = os.environ.get("REDIS_HOST", "0.0.0.0")
redis_client = redis.Redis(host=redis_host, port=6379, decode_responses=True)

# Route to get metrics
@routes.get("")
def get() -> Any:
    # Count the number of blogs
    cnt_blogs = redis_client.scard('blogs')

    # Initialize counters for comments and visitors
    cnt_comments, cnt_visitors = 0, 0

    # Iterate over blog IDs to count comments and visitors
    blog_ids = redis_client.sscan_iter('blogs')
    for blog_id in blog_ids:
        # Get the number of visitors for each blog
        visitors = redis_client.hget(f'blog:{blog_id}', 'visitors')
        cnt_visitors += int(visitors)

        # Get the number of comments for each blog
        comments = redis_client.scard(f'blog:{blog_id}:comments')
        cnt_comments += int(comments)
  
    # Create a dictionary containing the counted metrics
    counter = {
        'blogs': cnt_blogs,
        'comments': cnt_comments,
        'visitors': cnt_visitors
    }

    # Return the metrics data
    return {'data': counter}
