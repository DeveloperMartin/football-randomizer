FROM node:16.10.0-alpine3.11 as build
WORKDIR /app

COPY ./dist/football-randomizer /app/dist/football-randomizer

FROM nginx as runtime
COPY --from=build /app/dist/frontend /usr/share/nginx/html
