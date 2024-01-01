package com.armator.config;

import com.armator.model.SecurityRole;
import com.armator.model.Ship;
import com.armator.model.Shipowner;
import com.armator.model.User;
import com.armator.repositoriy.RoleRepository;
import com.armator.repositoriy.ShipRepository;
import com.armator.repositoriy.ShipownerRepository;
import com.armator.repositoriy.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {

    private final ShipRepository shipRepository;
    private final UserRepository userRepository;
    private final ShipownerRepository shipownerRepository;
    @Bean
    public UserDetailsService userDetailsService() {
        return username -> userRepository.findByEmail(username)
                .map(UserDetails.class::cast)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService());
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration ac) throws Exception {
        return ac.getAuthenticationManager();
    }

    @PostConstruct
    public void init() {
        var user = User.builder()
                .firstname("John")
                .lastname("Doe")
                .email("test@test.com")
                .password(passwordEncoder().encode("test"))
                .role(SecurityRole.USER)
                .build();
        var admin = User.builder()
                .firstname("Janusz")
                .lastname("Tracz")
                .email("admin@test.com")
                .password(passwordEncoder().encode("test"))
                .role(SecurityRole.ADMIN)
                .build();
        var shipowner = User.builder()
                .firstname("Piotr")
                .lastname("Gryf")
                .email("piotr@test.com")
                .password(passwordEncoder().encode("birdisaword"))
                .role(SecurityRole.SHIPOWNER)
                .build();

        userRepository.save(user);
        userRepository.save(admin);
        userRepository.save(shipowner);

        var shipOwner = Shipowner.builder()
                .user(shipowner)
                .build();

        shipownerRepository.save(shipOwner);

        var ship = Ship.builder()
                .name("Titanic")
                .shipOwner(shipOwner)
                .flag("Israel")
                .maxKnots(100)
                .maxFuelCapacity(100)
                .maxLoadsNumber(100)
                .longitude(56.0)
                .latitude(56.0)
                .build();

        shipRepository.save(ship);



    }

}
