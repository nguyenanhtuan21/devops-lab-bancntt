FROM mcr.microsoft.com/dotnet/sdk:6.0-alpine as build
WORKDIR /app
COPY . .
RUN dotnet restore
RUN dotnet publish -o /app/net-core-be

FROM mcr.microsoft.com/dotnet/aspnet:6.0-alpine as runtime
EXPOSE 80
EXPOSE 443
WORKDIR /app
COPY --from=build /app/net-core-be /app
ENTRYPOINT [ "dotnet", "/app/net-core-be.dll" ]