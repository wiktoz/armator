FROM maven:3.9.6-eclipse-temurin-21-alpine AS build

WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app
COPY --from=build /app/target/armator-0.0.1.jar .

CMD ["java", "-jar", "armator-0.0.1.jar"]