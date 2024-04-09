FROM docker-internal.blueriq.com/tomcat10.1-jdk21:1.0
LABEL maintainer="support@blueriq.com"

RUN rm -rf /usr/local/tomcat/webapps/*

ENV JAVA_OPTS="-Dspring.config.additional-location=file:///cds-config/ -Djava.security.egd=file:/dev/./urandom"
ENV JAVA_TOOL_OPTIONS -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:8000
ENV JPDA_ADDRESS="8000"
ENV JPDA_TRANSPORT="dt_socket"

COPY blueriq-customerdata-sql-store-application-*.war /usr/local/tomcat/webapps/customerdata.war
COPY h2-2.1.210.jar /usr/local/tomcat/lib/
COPY blueriq-customerdata-odata-service-v1.yml /cds-config/

EXPOSE 8080 8000
