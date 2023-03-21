# Docker Build WebApp

## Client 

- cd lab01/client

- Run `npm install`

- Run `npm run build`

- Build Image: `docker build -t docker-app:latest .`

- Run Container: `docker run -d -p 8080:80 client-web-app docker-app:latest`

## Server

- cd lab01/server

- Build Image: `docker build -t docker-api:latest .`

- Run Container `docker run -d -p 2103:80 server-web-app docker-api:latest`
