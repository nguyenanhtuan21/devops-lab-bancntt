FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 3308
ENV ASPNETCORE_URLS=http://*:3308

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["TestDBApplication.csproj", "."]
RUN dotnet restore "./TestDBApplication.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "TestDBApplication.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "TestDBApplication.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TestDBApplication.dll"]
