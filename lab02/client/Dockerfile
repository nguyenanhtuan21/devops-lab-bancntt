FROM node:latest as base
WORKDIR /app
COPY package*.json ./
RUN yarn add ...
COPY ./ .
CMD [ "yarn", "start"]