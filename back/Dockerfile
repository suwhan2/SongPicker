FROM openjdk:17

RUN ln -snf /usr/share/zoneinfo/Asia/Seoul /etc/localtime && echo Asia/Seoul > /etc/timezone

ARG JAR_FILE=build/libs/back-0.0.1-SNAPSHOT.jar

COPY ${JAR_FILE} back.jar

ENTRYPOINT ["java", "-jar", "-Duser.timezone=Asia/Seoul", "/back.jar"]