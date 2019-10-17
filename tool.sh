#!/usr/bin/env bash
grafana_version='6.4.2'
docker_user='w958660278'

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

initDevProject() {
  console br
  console info 'Init-tool'
  console br
  console action 'Clone source from https://github.com/WangHL0927/grafana.git'
  git clone https://github.com/WangHL0927/grafana.git
  cd ./grafana
  console action 'Run yarn install...'
  yarn install
  console success 'Init dev success!'
}

releaseDockerDev() {
  console br
  console info "Release Dev version and push to DockerHub"
  console danger "The full tag name like grafana-cn:$grafana_version.0001-dev"
  console danger "Input build version and press ENTER:[eg. 0002]"
  read version
  tag="$docker_user/grafana-cn:$grafana_version.$version-dev"
  console action "Build and push $grafana_version.$version-dev..."
  rm -rf ./grafana/public/build/*.js.map
  docker build -t $tag .
  docker push $tag
  tag2="$docker_user/grafana-cn:latest-dev"
  console action "Build and push latest-dev..."
  docker build -t $tag2 .
  docker push $tag2
  console success 'Release success!'
}

releaseDocker() {
  console br
  console info "Release Latest version and push to DockerHub"
  console danger "The full tag name like grafana-cn:$grafana_version.0001"
  console danger "Input build version and press ENTER:[eg. 0002]"
  read version
  tag="$docker_user/grafana-cn:$grafana_version.$version"
  tag2="$docker_user/grafana-cn:latest"
  console action "Build and push $grafana_version.$version..."
  rm -rf ./grafana/public/build/*.js.map
  docker build -t $tag .
  docker push $tag
  console action "Build and push latest..."
  docker build -t $tag2 .
  docker push $tag2
  console success 'Release success!'
}

printMenu() {
  console br
  console info "Tool Script"
  console br
  console info "1. Start dev-server."
  console info "2. Stop/Remove dev-server."
  console info "3. Release to DockerHub with dev tag."
  console info "4. Release to DockerHub with latest tag."
  console info "5. Init dev project."
  console br
  console danger "Input number and press ENTER:"
}

main() {
  printMenu

  read num
  case $num in
  "1") ./dev-server/dev-server.sh ;;
  "2") ./dev-server/remove-dev-server.sh ;;
  "3") releaseDockerDev ;;
  "4") releaseDocker ;;
  "5") initDevProject ;;
  *)
    console error "ERROR: undefined function!"
    exit;;
  esac
}

main
