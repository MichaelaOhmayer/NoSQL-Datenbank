## API Backend w/ Redis as a Database

Please, **DO NOT** use Redis as a database in production. It's ment as a cache or session storage for data your app is allowed to loose. It's an in-memory database that **DOES NOT SCALE** well to the storage requirements needed to run apps with millions of users.

Run these steps to start the app. You can modify the API_KEY variable in the .env file to start the application with a real API key.

## Start the applicaiton. 

Start API backend and Redis. It will autoamtically start the build of the api server if it does not yet exist on the local machine.

```bash
docker-compose up
```

Force a rebuild of the server image on changes. 

```bash
docker compose up --build
```

## Testing the API

You can use the http files in `docs` to send test api requests to the application's API server.

### Start Redis Separatly

You can start Redis separatly for local testing. 

```bash
docker run -p 6379:6379 redis 
```