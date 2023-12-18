mkdir tmp
docker-compose --file ./cypress/docker/dashboards/docker-compose.yml logs --tail=all > ./tmp/e2e-dashboards-logs.txt
docker-compose --file ./cypress/docker/dashboards/docker-compose.yml down --rmi local -v
