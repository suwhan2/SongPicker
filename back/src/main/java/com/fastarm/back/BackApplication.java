package com.fastarm.back;

import com.fastarm.back.song.entity.Song;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;

import java.util.List;

@EnableJpaAuditing
@EnableRedisHttpSession(maxInactiveIntervalInSeconds = 900)
@SpringBootApplication
public class BackApplication {

    public static void main(String[] args) {

        SpringApplication.run(BackApplication.class, args);
    }

}
