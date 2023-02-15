FROM openjdk:17-jdk-slim

LABEL maintainer="support@blueriq.com"

ENV JAVA_TOOL_OPTIONS -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:8000
EXPOSE 8080 8000

COPY preparations/blueriq-customerdata-sql-store-standalone-*.jar ~/customerdata.jar
COPY dashboards/config/customerdata/blueriq-customerdata-odata-service-v1.yml /config/blueriq-customerdata/

WORKDIR ~

ENTRYPOINT ["java", "-Dspring.config.additional-location=file:///config/blueriq-customerdata/", "-jar", "customerdata.jar", "-Xmx256m" ]
