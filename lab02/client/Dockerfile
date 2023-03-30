FROM node:latest as base
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY ./ .
CMD [ "yarn", "start"]