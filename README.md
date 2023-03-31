# Doggie Match Maker

This is a frontend application targeted at finding that perfect match!

## Running the server locally

The application is containerized via docker, and can be spun locally using the commands below. Since the application is running behind an NginX reverse proxy, visiting `localhost` will bring you to the splash screen directly.

### Dev

`docker compose -f docker-compose.dev.yml up --build`

### Staging

`docker compose -f docker-compose.staging.yml up --build`

### Prod

`docker compose up`
