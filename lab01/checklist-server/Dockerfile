FROM mcr.microsoft.com/dotnet/sdk:5.0 as build
WORKDIR /app
COPY . .
RUN dotnet restore
RUN dotnet publish -o /app/ASPNETCoreVueChecklist

FROM mcr.microsoft.com/dotnet/aspnet:5.0 as runtime
EXPOSE 80
EXPOSE 443
WORKDIR /app
COPY --from=build /app/ASPNETCoreVueChecklist /app
ENTRYPOINT [ "dotnet", "/app/ASPNETCoreVueChecklist.dll" ]