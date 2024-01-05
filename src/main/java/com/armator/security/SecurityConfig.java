package com.armator.security;


import com.armator.model.SecurityRole;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.authorizeHttpRequests()
                .requestMatchers("/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()
                .requestMatchers("/api/v1/auth/login").permitAll()
                .requestMatchers("/api/v1/auth/check-token").permitAll()
                .requestMatchers("/api/v1/auth/register").hasAnyAuthority(SecurityRole.ADMIN.name())
                .requestMatchers("/api/v1/ship/**").hasAnyAuthority(SecurityRole.SHIPOWNER.name())
                .requestMatchers("/api/v1/user/email/**").hasAnyAuthority(SecurityRole.SHIPOWNER.name(), SecurityRole.ADMIN.name())
                .requestMatchers("/api/v1/user/all/**").hasAnyAuthority(SecurityRole.SHIPOWNER.name(), SecurityRole.ADMIN.name())
                .requestMatchers("/api/v1/user/id/**").hasAnyAuthority(SecurityRole.SHIPOWNER.name(), SecurityRole.ADMIN.name())
                .anyRequest().authenticated();
        http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        http.authenticationProvider(authenticationProvider).addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
