FROM node:13.8.0-alpine3.11 as build

COPY package.json /app/package.json
COPY ./public /app/public
COPY ./src /app/src
COPY tsconfig.json /app/tsconfig.json

WORKDIR /app
RUN npm i && npm run build

#
# PROD CONFIG
#
FROM nginx:1.17.8-alpine

RUN addgroup -g 500 dilip &&\
 adduser -u 500 -G dilip -s /bin/bash -h /dilip -D dilip &&\
 chown -R dilip:dilip /etc/nginx/ &&\
 mkdir -p /var/cache/nginx/client_temp &&\
 chmod -R 777 /var/cache/nginx &&\
 chmod -R 777 /var/run/

COPY --from=build /app/build /usr/share/nginx/html
COPY ./support/prod/nginx.conf /etc/nginx/nginx.conf.template
COPY ./support/common/entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

EXPOSE 5000
USER dilip

ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]