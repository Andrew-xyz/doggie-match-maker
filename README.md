# Doggie Match Maker

This is a frontend application targeted at finding that perfect match!

## Running the server locally

The application is containerized via docker, and can be spun locally using the commands below. Since the application is running behind an NginX reverse proxy, visiting `localhost` will bring you to the splash screen directly.

General Requirements:

- Docker / Docker Engine running locally
- That's it!

### Dev / Staging

To run the development / staging environments with access to the API, a `.env` file is required at `/app` (i.e. `/app/.env`). The environment file requires the following variables:

- VITE_FETCH_API_KEY = `<your-valid-api-key>`

The dev environment is fitted with HMR via host volume mapping using Vite and PostCSS. This environment can be run using the following command:

`docker compose -f docker-compose.dev.yml up --build`

The staging environment provides a full build of the `/dist` folder and can be used to simulate production deployments. This does not provide HMR. This environment can be run using the following command:

`docker compose -f docker-compose.stage.yml up --build`

### Prod

Production uses a pre-hosted docker container cross-compiled for compatibility using GitHub Actions. Environment variables are not required for prodution builds, as they are baked in using Vite (utilizing dot-env) and protected with GitHub secrets. To run the production container, which can be hosted using any cloud container service, simply run the following command:

`docker compose up`
