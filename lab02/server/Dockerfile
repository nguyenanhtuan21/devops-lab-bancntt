FROM mcr.microsoft.com/dotnet/sdk:6.0-alpine as build
WORKDIR /app
COPY . ./
RUN dotnet restore
RUN dotnet publish -o /app/TodoApp


FROM mcr.microsoft.com/dotnet/aspnet:6.0-alpine as runtime
EXPOSE 80
EXPOSE 443
WORKDIR /app
COPY --from=build /app/TodoApp /app
ENTRYPOINT [ "dotnet", "/app/TodoApp.dll" ]