# build stage
FROM node:19-alpine3.16 as build-stage
WORKDIR /app
COPY ./app/package*.json .
RUN npm install
COPY ./app .
RUN npm run build
RUN npm prune --production

# production stage
FROM nginx:stable-alpine as production-stage
COPY ./config/nginx/nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
WORKDIR /usr/share/nginx/html
COPY --from=build-stage /app/dist .
EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]