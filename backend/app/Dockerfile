FROM maven:3.9.1 as build
WORKDIR /app
COPY pom.xml .
COPY src src
RUN mvn clean test package

FROM openjdk:17-alpine as deploy
COPY --from=build app/target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]