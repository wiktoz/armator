package com.armator;

import com.armator.models.ERole;
import com.armator.models.Role;
import com.armator.repository.RoleRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Optional;

@SpringBootApplication
public class ArmatorApplication {

	@Autowired
	private RoleRepository roleRepository;

	public static void main(String[] args) {
		SpringApplication.run(ArmatorApplication.class, args);
	}

	@PostConstruct
	public void init() {
		// Create roles if they don't exist
		for (ERole role : ERole.values()) {
			Optional<Role> optionalRole = roleRepository.findByName(role);
			if (!optionalRole.isPresent()) {
				Role newRole = new Role();
				newRole.setName(role);
				roleRepository.save(newRole);
			}
		}
	}


}
