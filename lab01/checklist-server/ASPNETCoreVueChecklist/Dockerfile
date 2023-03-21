FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /source

COPY *.sln .
COPY ASPNETCoreVueChecklist/*.csproj ./ASPNETCoreVueChecklist/
RUN dotnet restore

COPY ASPNETCoreVueChecklist/. ./ASPNETCoreVueChecklist/
WORKDIR /source/ASPNETCoreVueChecklist
RUN dotnet publish -c release -o /app --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:5.0
WORKDIR /app
COPY --from=build /app ./
ENTRYPOINT ["dotnet", "ASPNETCoreVueChecklist.dll"]