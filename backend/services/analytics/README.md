## Project description
This is the one out of 5 microservices developed to implement werec project. This part of it works with analytics
data, collecting all the events happening in the system generating different reports on demand.

Implemented by: https://github.com/zhurbey


## Project structure
`TODO`: complete description
```
.
├── Dockerfile
├── docker-compose.yaml
├── Makefile
├── docs
│   ├── openapi

Makefile - utility commands
docs/oenapi - openapi specification
```


## Commands
`TODO`: describe all commands

`make openapi` - start up the container with rendered openapi specification with forwarded ports 8081:8081,
rendered documentation will be available on address: /api/v1/docs. \
Later, ports will be forwared only for nginx container and not for openapi anymore.

`make postgres` - start up container with postgres database.

`make api` - run server on :8080 port, database is migrated on service initialization.

`make style_check`
