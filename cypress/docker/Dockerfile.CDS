FROM azul-zulu:25.38-25.0.5.1-jdk-debian13@sha256:6e688994387052ff293aee39ff306684134ed868e6167fd957080874d9a0e9f9

LABEL maintainer="support@blueriq.com"

EXPOSE 8080

COPY preparations/blueriq-customerdata-sql-store-standalone-rest-*.jar ~/customerdata.jar
COPY blueriq-customerdata-service.yml /config/blueriq-customerdata/

WORKDIR ~

ENTRYPOINT ["java", "-Dspring.config.additional-location=file:///config/blueriq-customerdata/", "-jar", "customerdata.jar", "-Xmx384m" ]
