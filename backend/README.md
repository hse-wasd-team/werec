# WeRec web app with ASP.NET Core, PostgreSQL and Docker

### Running the App with Docker Compose

1. Install `Docker Desktop for Mac` or `Docker Desktop for Windows`.

2. Navigate to the `WeRecWebApp` subfolder in a console window.

3. Run commands in the terminal window:

    - Run `docker-compose build`

    - Run `docker-compose up`

4. Navigate to http://localhost:5000/swagger in your browser to view the site.

### Tech overview

1. PostgreSQL and Npgsql driver for EF Core ORM 
2. ASP.NET Core for web app development
3. Swagger UI and Editor, Swashbuckle for asp.net app
4. Google YouTube API V3 as a video source
5. Docker and docker compose for running the app