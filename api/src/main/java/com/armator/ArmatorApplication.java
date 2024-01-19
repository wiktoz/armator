package com.armator;


import com.armator.security.KeyLoader;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import java.security.KeyStore;

@SpringBootApplication
@EntityScan(basePackages = "com.armator")

public class ArmatorApplication {


	public static void main(String[] args) {
		KeyLoader keyLoader = new KeyLoader();
		keyLoader.createKeystoreFile();
		SpringApplication.run(ArmatorApplication.class, args);
	}



}
