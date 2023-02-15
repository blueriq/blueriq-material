:: Init
set $LOCATION="./cypress/docker/preparations"
set $BQ_VERSION="15.9.2.800"
set $CDS_VERSION="4.1.1"

:: Wars
call mvn dependency:copy "-Dartifact=com.blueriq:blueriq-runtime-application:%$BQ_VERSION%:war" "-DoutputDirectory=%$LOCATION%" "-Dproject.basedir=%$LOCATION%"
call mvn dependency:copy "-Dartifact=com.blueriq:blueriq-customerdata-sql-store-standalone:%$CDS_VERSION%:jar" "-DoutputDirectory=%$LOCATION%"

:: Copy
xcopy /I dist cypress\docker\preparations\dist /Y

:: Docker build and start
docker-compose --compatibility --file ./cypress/docker/docker-compose.yml build
docker-compose --compatibility --file ./cypress/docker/docker-compose.yml up -d
