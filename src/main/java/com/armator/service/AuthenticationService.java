package com.armator.service;

import com.armator.DTO.auth.*;
import com.armator.exceptions.SecurityException;
import com.armator.exceptions.UserAlreadyExistsException;
import com.armator.model.*;
import com.armator.repositoriy.TokenRepository;
import com.armator.repositoriy.UserRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final TokenRepository tokenRepository;
    public RegisterMessage register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()){
            throw new UserAlreadyExistsException("This user already exists!");
        }
        var user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();
        userRepository.save(user);
        return RegisterMessage.builder()
                .message("User registered successfully")
                .registered(true)
                .build();
    }

    public AuthResponse login(AuthenticationRequest request, HttpServletResponse response) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        var jwtToken = jwtService.generateToken(user);
        ResponseCookie cookie = ResponseCookie.from("Authorization", jwtToken)
                .httpOnly(true)
                .path("/")
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return AuthResponse.builder()
                .token(jwtToken)
                .build();

    }
    public AuthMessage checkToken(TokenReq req) {
        String email = jwtService.extractEmail(req.getToken());
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(email);
        boolean isValid = false;
        try {
            isValid = jwtService.isTokenValid(req.getToken(), userDetails);
        } catch (SecurityException e) {
            return AuthMessage.builder()
                    .message("Token is invalid.")
                    .authenticated(false)
                    .build();
        }
        return AuthMessage.builder()
                .message("Token is valid.")
                .authenticated(isValid)
                .build();
    }

    public RevokeStatus revokeToken(TokenReq req){
        final MessageDigest digest;
        try {
            digest = MessageDigest.getInstance("SHA3-256");
        } catch (NoSuchAlgorithmException e) {
            throw new SecurityException("Error while hashing token.");
        }
        final byte[] hashbytes = digest.digest(req.getToken().getBytes());
        String hash = new String(hashbytes);
        tokenRepository.save(RevokedToken.builder().revokedTokenDigest(hash).build());
        ResponseCookie cookie = ResponseCookie.from("Authorization", "")
                .httpOnly(true)
                .path("/")
                .build();
        return RevokeStatus.builder()
                .message("Token revoked.")
                .revoked(true)
                .build();
    }
}
