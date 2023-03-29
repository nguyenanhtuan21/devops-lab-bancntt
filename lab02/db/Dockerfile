FROM mysql:8.0.32
COPY ./init /docker-entrypoint-initdb.d/
RUN chmod -R 777 /docker-entrypoint-initdb.d