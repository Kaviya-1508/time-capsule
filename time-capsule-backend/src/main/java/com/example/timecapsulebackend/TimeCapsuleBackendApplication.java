package com.example.timecapsulebackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class TimeCapsuleBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(TimeCapsuleBackendApplication.class, args);
    }
}