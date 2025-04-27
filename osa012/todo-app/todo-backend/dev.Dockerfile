FROM node:20

WORKDIR /usr/src/app

COPY --chown=node:node . .

# Change npm ci to npm install since we are going to be in development mode
RUN npm install

ENV DEBUG=todo-backend:*

CMD ["npm", "run", "dev"]
