## Install Locally

Run with >= Python3.10.

```bash
cd api
pip install -r requirements.txt
```

## Start Locally

Run the backend. 
It will auto-rebuild on changes to the code.

Set the api key for the admin delete operations.

```bash
# in redis-blog dir
ADMIN_KEY="<secret>" uvicron api.main:app --reload --port 8081
```