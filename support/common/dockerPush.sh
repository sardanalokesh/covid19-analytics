#!/usr/bin/env bash

REGISTRY_HOST=""

usage() { echo "Usage: $0 [-r <repo-name>] [-v <version>]" 1>&2; exit 1; }

while getopts ":r:v:" o; do
    case "${o}" in
        r)
            r=${OPTARG}
            ;;
        v)
            v=${OPTARG}
            ;;
        *)
            usage
            ;;
    esac
done
shift $((OPTIND-1))

if [ -z "${r}" ] || [ -z "${v}" ]; then
    usage
fi

echo "creating tag for version ${v}"
docker tag ${r}:${v} ${REGISTRY_HOST}/${r}:${v}
RETVAL=$?
[ $RETVAL -eq 0 ] && echo "OK" || echo "FAILED"

echo "creating latest version tag"
docker tag ${r}:${v} ${REGISTRY_HOST}/${r}:latest
RETVAL=$?
[ $RETVAL -eq 0 ] && echo "OK" || echo "FAILED"

echo "pushing to registry ${REGISTRY_HOST}"
docker push ${REGISTRY_HOST}/${r}
RETVAL=$?
[ $RETVAL -eq 0 ] && echo "OK" || echo "FAILED"