FROM openjdk:21
VOLUME /tmp
COPY ./main/resources/app.jar /app.jar
RUN adduser --system spring
USER spring
ENTRYPOINT ["java","-jar","/app.jar"]
