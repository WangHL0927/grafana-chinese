#!/usr/bin/env bash
grafana_version='6.4.3'
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
  console action 'create grafana-dev-server data...'
  docker run -d -p 3000:3000 --name grafana-dev-server-temp grafana/grafana:$grafana_version
  sleep 5s
  mkdir -p  `pwd`/tmp/grafana-dev-server/etc
  mkdir -p  `pwd`/tmp/grafana-dev-server/var/lib
  docker cp grafana-dev-server-temp:/etc/grafana `pwd`/tmp/grafana-dev-server/etc
  docker cp grafana-dev-server-temp:/var/lib/grafana `pwd`/tmp/grafana-dev-server/var/lib
  docker stop grafana-dev-server-temp && docker rm grafana-dev-server-temp
  console action 'run container grafana-dev-server...'
  docker run \
    -d \
    -p 3000:3000 \
    --name grafana-dev-server \
    -v `pwd`/grafana/public:/usr/share/grafana/public \
    -v `pwd`/tmp/grafana-dev-server/var/lib/grafana:/var/lib/grafana \
    -v `pwd`/tmp/grafana-dev-server/etc/grafana:/etc/grafana \
    grafana/grafana:$grafana_version
  console success 'grafana-dev-server running at http://localhost:3000'
}

main
