package com.example.medai;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableCaching
@EnableJpaAuditing
public class MedaiApplication {

	public static void main(String[] args) {
		SpringApplication.run(MedaiApplication.class, args);
	}

}
