package com.armator.controller;


import com.armator.DTO.Message;
import com.armator.DTO.auth.*;
import com.armator.exceptions.SecurityException;
import com.armator.exceptions.UserAlreadyExistsException;
import com.armator.service.AuthenticationService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try{
            return ResponseEntity.ok(authenticationService.register(request));
        } catch (UserAlreadyExistsException e) {
            return ResponseEntity.ok(RegisterMessage.builder().message("This user already exists!").registered(false).build());
        }

    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest request, HttpServletResponse response ) {
        try{
            return ResponseEntity.ok((authenticationService.login(request, response)));
        } catch (AuthenticationException e) {
            return ResponseEntity.ok(AuthMessage.builder().message("Authentication failed. Invalid credentials").authenticated(false).build());
        }

    }
    @GetMapping("/check-token")
    public ResponseEntity<?> checkToken(@RequestHeader("Authorization") String token) {
        try{
            return ResponseEntity.ok(authenticationService.checkToken(token.substring(7)));
        } catch (Exception e) {
            return ResponseEntity.ok(AuthMessage.builder().message("Authentication failed. Invalid token.").authenticated(false).build());
        }
    }

    @GetMapping("/revoke-token")
    public ResponseEntity<?> revokeToken(@RequestHeader("Authorization") String token) {
        try{
            return ResponseEntity.ok(authenticationService.revokeToken(token.substring(7)));
        } catch (SecurityException e) {
            return ResponseEntity.ok(RevokeStatus.builder().message("Token not revoked.").revoked(false).build());
        }
    }


}
