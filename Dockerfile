# build stage
FROM node:19-alpine3.16 as build-stage
WORKDIR /app
COPY ./app/package*.json ./
RUN npm install
COPY ./app .
RUN npm run build
RUN npm prune --production

# production stage
FROM nginx:stable-alpine as production-stage
COPY ./config/nginx/nginx.heroku.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build-stage /app/dist /usr/share/nginx/html

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'