mkdir tmp
docker-compose --file ./cypress/docker/docker-compose.yml logs --tail=all > ./tmp/e2e-logs.txt
docker-compose --file ./cypress/docker/docker-compose.yml down --rmi local -v
