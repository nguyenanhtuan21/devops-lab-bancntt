# Todo App
## Client
``` 
cd ./client/todo-app
docker build --tag lab01-client:latest .
docker run -d -p 8000:8080 lab01-client
```
## Server
``` 
cd ./server/todo-app/todo-app/
docker build --tag lab01-server:latest .
docker run -d -p 27051:80 lab01-server
```
