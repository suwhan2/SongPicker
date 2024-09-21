package com.fastarm.back.deploy.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheckController {
    @CrossOrigin(origins = "*")
    @GetMapping("/health-check")
    public String healthCheck() {
        return "OK";
    }
}
