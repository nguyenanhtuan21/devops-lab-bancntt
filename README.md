# Lab01
## Client
``` 
cd ./frontend/
docker build . --no-cache --tag lab01-frontend:latest
docker run -d -p 81:3000 lab01-frontend
```
## Server
``` 
cd ./backend/Lab01Demo$
docker build ./Lab01Demo/ --no-cache --tag lab01-backend:latest
docker run -d -p 82:80 lab01-backend
```

