FROM node:16.18.0-alpine

WORKDIR /app
COPY './package*.json' ./

RUN npm install

COPY . .
EXPOSE 8080
CMD [ "npm", "run", "serve" ]