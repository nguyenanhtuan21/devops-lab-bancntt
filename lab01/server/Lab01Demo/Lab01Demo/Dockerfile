FROM mcr.microsoft.com/dotnet/sdk:6.0-alpine as build
WORKDIR /app
COPY . .
RUN dotnet restore
RUN dotnet publish -o /app/Lab01Demo

FROM mcr.microsoft.com/dotnet/aspnet:6.0-alpine as runtime
EXPOSE 80
EXPOSE 443
WORKDIR /app
COPY --from=build /app/Lab01Demo /app
ENTRYPOINT [ "dotnet", "/app/Lab01Demo.dll" ]