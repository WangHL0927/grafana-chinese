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

printMenu() {
  console br
  console info Tool Script
  console br
  console info "1. Start dev-server"
  console info "2. Remove dev-server"
  console br
  console danger "Input number and press ENTER:"
}

main() {
  printMenu

  read num
  case $num in
  "1") ./dev-server/dev-server.sh ;;
  "2") ./dev-server/remove-dev-server.sh ;;
  *)
    console error "ERROR: undefined function!"
    exit
    ;;
  esac
}

main
