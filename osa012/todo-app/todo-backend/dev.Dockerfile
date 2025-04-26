FROM node:20

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci

CMD ["npx", "nodaemon", "index.js"]
