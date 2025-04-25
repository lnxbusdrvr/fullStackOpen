FROM node:20 AS build-stage 

WORKDIR /usr/src/app

COPY . .

RUN npm ci

ENV VITE_BACKEND_URL=http://localhost:3001

RUN npm run build

FROM nginx:1.25-alpine

# COPY the directory dist from the build-stage to /usr/share/nginx/html

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
