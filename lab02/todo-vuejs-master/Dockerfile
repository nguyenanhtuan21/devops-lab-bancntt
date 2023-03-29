# build stage
FROM node:16.18.0-alpine
WORKDIR /app
COPY './package*.json' ./

RUN npm install

COPY . .
EXPOSE 8080
CMD [ "npm", "run", "serve" ]
# FROM nginx as production-stage
# RUN mkdir /app
# COPY --from=build-stage /app/dist /app
# COPY nginx.conf /etc/nginx/nginx.conf