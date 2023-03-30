# Docker Build WebApp

## Khởi tạo network

- Create Network: docker network create --driver overlay --attachable --subnet 192.0.0.0/16 --opt com.docker.network.driver.mtu=1200 my-network

## Client 

- cd lab01/client

- Build Image: `docker build -t docker-app:latest .`

- Run Container: `docker run -d -p 8080:80 client-web-app docker-app:latest --network=my-network`

## Server

- cd lab01/server

- Build Image: `docker build -t docker-api:latest .`

- Run Container with network: `docker run -d -p 2103:80 server-web-app docker-api:latest --network=my-network`

## Create Db container
