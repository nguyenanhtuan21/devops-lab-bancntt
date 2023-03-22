Create test vuejs app and build by docker 

build app:
    docker image build --pull --file "./Dockerfile" --tag "firstapp:latest" --label "com.microsoft.created-by=visual-studio-code"

run app and forward port to localhost:5000
    docker run -p 80:80 firstapp:latest

chua thuc hien mount static folder
