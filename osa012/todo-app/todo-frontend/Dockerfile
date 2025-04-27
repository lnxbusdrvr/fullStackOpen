# --- TEST-STAGE ---
FROM node:20 AS test-stage
WORKDIR /usr/src/app
COPY . .
RUN npm ci && npm test

# --- BUILD-STAGE ---
FROM node:20 AS build-stage
WORKDIR /usr/src/app
COPY . .
ENV VITE_BACKEND_URL=/api/
RUN npm ci && npm run build

# --- PRODUCTION-STAGE ---
FROM nginx:1.25-alpine AS production-stage
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

