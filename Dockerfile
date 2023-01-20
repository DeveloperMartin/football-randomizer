FROM node:16.10.0-alpine3.11 as build
WORKDIR /app

COPY ./dist/frontend /app/dist/frontend

FROM nginx as runtime
COPY --from=build /app/dist/frontend /usr/share/nginx/html
