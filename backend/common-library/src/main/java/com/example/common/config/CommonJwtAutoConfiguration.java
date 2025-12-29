package com.example.common.config;

import org.springframework.boot.autoconfigure.AutoConfiguration;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.ComponentScan;

@AutoConfiguration
@ComponentScan(basePackages = {"com.example.common.jwt"})
@ConditionalOnProperty(name = "common.jwt.enabled", havingValue = "true", matchIfMissing = true)
public class CommonJwtAutoConfiguration {
}
