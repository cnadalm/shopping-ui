#!/bin/bash
set -euo pipefail
cd ${0%/*}

trap cleanup EXIT

# stop container on script exit
function cleanup() {
  echo "shutting down"
  docker stop nginx-proxy &> /dev/null || true
}

# start Nginx with our config, use host network
docker run --rm \
  --name nginx-proxy \
  --network host \
  -v $(pwd)/nginx.conf:/etc/nginx/nginx.conf \
  nginx:1.13.6 &

# open browser pointing to our proxy url
chromium 'http://localhost:3000/' &> /dev/null &

# serve and watch our frontend directories test/ src/
#browser-sync 'app/test' 'app/src' --port 3001 --no-open -w
browser-sync 'app/src' --port 3001 --no-open -w
