FROM mcr.microsoft.com/dotnet/core/sdk
ENV ASPNETCORE_URLS=http://+:8080
WORKDIR /var/www/aspnetcoreapp
COPY . .
EXPOSE 8080
ENTRYPOINT ["/bin/bash", "-c", "dotnet restore && dotnet run"]