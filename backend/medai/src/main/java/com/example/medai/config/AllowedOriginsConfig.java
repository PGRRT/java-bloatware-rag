package com.example.medai.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class AllowedOriginsConfig {

    @Value("#{'${app.allowed-origins}'.split(',')}")
    private List<String> allowedOrigins;

    @Bean
    public List<String> allowedOrigins() {
        return allowedOrigins;
    }
}
