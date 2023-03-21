

B1: cd ../lab01/server/app

B2: build server
docker build -t server .

B3: run server
docker run -dp 1204:1234 server

B4: mở trình duyệt: http://localhost:1204/


********
