FROM maven:3.5.2-jdk-8-alpine
WORKDIR /usr/src/app
COPY . .
RUN mvn clean install
EXPOSE 8080
CMD mvn jetty:run