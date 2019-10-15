#!/usr/bin/env bash

console() {
  content=$2
  case $1 in
  "br") echo -e "\033[36m------------------------------\033[0m" ;;
  "info") echo -e "\033[36m$content\033[0m" ;;
  "action") echo -e "\033[36m$content\033[0m" ;;
  "success") echo -e "\033[32m$content\033[0m" ;;
  "error") echo -e "\033[31m$content\033[0m" ;;
  "warning") echo -e "\033[33m$content\033[0m" ;;
  "danger") echo -e "\033[35m$content\033[0m" ;;
  esac
}

main() {
  console br
  console info 'Start grafana-dev-server...'
  console action 'run container grafana-dev-server'
  docker run \
    -d \
    -p 3000:3000 \
    --name grafana-dev-server \
    -v `pwd`/grafana/public:/usr/share/grafana/public \
    grafana/grafana:6.4.2
  console success 'grafana-dev-server run at http://localhost:3000'
}

main
