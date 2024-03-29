from pydantic import BaseModel
from datetime import datetime

class Blog(BaseModel):
  uuid: str = ""
  author: str = 'anonymous'
  content: str
  title: str 
  visitors: int = 0
  created: str = ""

class Comment(BaseModel):
  uuid: str = ""
  author: str = "anonymous"
  content: str
  created: str = ""