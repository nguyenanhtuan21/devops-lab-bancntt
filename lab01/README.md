# Lab 01: Simple docker setup

## Client

- cd lab01\CRMBug-FE
- Run `npm install --save`
- Run `npm run build`
- Run `docker build -f Dockerfile -t client:latest .` 
- Run `docker run -itd -p 8080:80 client:latest`

## Server

- cd lab01\CRMBug-BE
- Run `docker build -f BugTracking\Dockerfile -t server:latest .`
- Run `docker run -itd --rm -p 9090:80 server:latest`
