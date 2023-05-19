FROM openjdk:17-jdk-alpine@sha256:a996cdcc040704ec6badaf5fecf1e144c096e00231a29188596c784bcf858d05

LABEL maintainer="support@blueriq.com"

EXPOSE 8080

COPY preparations/blueriq-customerdata-sql-store-standalone-*.jar ~/customerdata.jar
COPY blueriq-customerdata-odata-service-v1.yml /config/blueriq-customerdata/

WORKDIR ~

ENTRYPOINT ["java", "-Dspring.config.additional-location=file:///config/blueriq-customerdata/", "-jar", "customerdata.jar", "-Xmx384m" ]
