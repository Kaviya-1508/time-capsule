FROM eclipse-temurin:25-jdk-jammy
WORKDIR /app
COPY target/time-capsule-backend-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]