# https://hub.docker.com/_/microsoft-dotnet
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /source
COPY . .

RUN dotnet restore "./Lab01/Lab01.csproj"
RUN dotnet publish "./Lab01/Lab01.csproj" -c release -o /lab01/server --no-restore

# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /lab01/server
COPY --from=build /lab01/server ./

EXPOSE 80
ENTRYPOINT ["dotnet", "Lab01.dll"]