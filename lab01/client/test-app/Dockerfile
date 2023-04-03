FROM node:16.18.0-alpine as build

WORKDIR /app 
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 442
CMD [ "npm", "run", "serve" ]