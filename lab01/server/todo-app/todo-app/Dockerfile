FROM mcr.microsoft.com/dotnet/sdk:6.0-alpine as build
WORKDIR /app
COPY . .
RUN dotnet restore
RUN dotnet publish -o /app/todo-app

FROM mcr.microsoft.com/dotnet/aspnet:6.0-alpine as runtime
EXPOSE 80
EXPOSE 445
WORKDIR /app
COPY --from=build /app/todo-app/app
ENTRYPOINT [ "dotnet", "/app/todo-app.dll" ]