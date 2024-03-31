from pydantic import BaseModel
from datetime import datetime

# Define a Pydantic model for a Blog
class Blog(BaseModel):
  uuid: str = ""
  author: str = 'anonymous'
  content: str
  title: str 
  visitors: int = 0
  created: str = ""

# Define a Pydantic model for a Comment
class Comment(BaseModel):
  uuid: str = ""
  author: str = "anonymous"
  content: str
  created: str = ""