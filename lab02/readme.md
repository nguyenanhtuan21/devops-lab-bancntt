## Pull code từ github
```sh
git clone https://github.com/nguyenanhtuan21/devops-lab-bancntt.git
cd devops-lab-bancntt
git checkout nvson3
```
## Cài đặt server
```sh
cd lab01/server
docker build --rm -t lab01/server:latest .
docker run --rm -p 8888:5000 -e ASPNETCORE_URLS=http://+:5000 --name lab01-server lab01/server:latest
```
## Cài đặt client
```sh
cd lab01/ClientVue
docker build --rm -t lab01/client:latest .
docker run -it -p 8080:8080 --rm --name lab01-client lab01/client:latest