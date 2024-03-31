import os
from fastapi import HTTPException

admin_key = os.environ.get("ADMIN_KEY") #isnt used in the UI due to the fact an admin usually has access to the backend to delte comments and blogs manually if needed

# Validate that the user sent a valid (let's assume also rotated) admin api key. 
# A real auth prodiver should be used in production instead.
def is_admin(auth_header: str):
  if not auth_header:
    raise HTTPException(status_code=403, detail='no authorization prodived')

  items = auth_header.split(' ', maxsplit=2)
  if len(items) != 2:
     raise HTTPException(status_code=403, detail='invalid authorization scheme')

  scheme = items[0]
  key = items[1]

  if not key:
    raise HTTPException(status_code=403, detail="no key or authorization provided")


  if not scheme == 'ApiKey':
    raise HTTPException(status_code=403, detail="invalid authorization scheme")
  
  if not key == admin_key:
    raise HTTPException(status_code=403, detail='invalid admin credentials')
  

