#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["TodoListBE/TodoListBE.API.csproj", "TodoListBE/"]
COPY ["TodoListBE.BL/TodoListBE.BL.csproj", "TodoListBE.BL/"]
COPY ["TodoListBE.Core/TodoListBE.Core.csproj", "TodoListBE.Core/"]
COPY ["TodoListBE.Infrastructure/TodoListBE.Infrastructure.csproj", "TodoListBE.Infrastructure/"]
RUN dotnet restore "TodoListBE/TodoListBE.API.csproj"
COPY . .
WORKDIR "/src/TodoListBE"
RUN dotnet build "TodoListBE.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "TodoListBE.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TodoListBE.API.dll"]