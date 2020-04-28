#!/usr/bin/env sh
set -eu
envsubst '${BACKEND}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf
exec "$@"