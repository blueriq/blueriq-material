FROM openjdk:21-jdk-slim

LABEL maintainer="support@blueriq.com"

EXPOSE 8080

COPY preparations/blueriq-customerdata-sql-store-standalone-*.jar ~/customerdata.jar
COPY blueriq-customerdata-odata-service-v1.yml /config/blueriq-customerdata/

WORKDIR ~

ENTRYPOINT ["java", "-Dspring.config.additional-location=file:///config/blueriq-customerdata/", "-jar", "customerdata.jar", "-Xmx384m" ]
