FROM azul/zulu-openjdk-centos:25

LABEL maintainer="support@blueriq.com"

EXPOSE 8080

COPY preparations/blueriq-customerdata-sql-store-standalone-rest-*.jar ~/customerdata.jar
COPY blueriq-customerdata-service.yml /config/blueriq-customerdata/

WORKDIR ~

ENTRYPOINT ["java", "-Dspring.config.additional-location=file:///config/blueriq-customerdata/", "-jar", "customerdata.jar", "-Xmx384m" ]
