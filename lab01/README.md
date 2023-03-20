# Lab01
## Client
``` 
cd ./client/
docker build . --no-cache --tag lab01-client:{version} --tag lab01-client:latest
docker run -d -p 8000:3000 lab01-client
```
## Server
``` 
cd ./server/Lab01Demo$
docker build ./Lab01Demo/ --no-cache --tag lab01-server:{version} --tag lab01-server:latest
docker run -d -p 8001:80 lab01-server
```