package com.armator.controller;


import com.armator.DTO.auth.AuthResponse;
import com.armator.DTO.auth.AuthenticationRequest;
import com.armator.DTO.auth.RegisterRequest;
import com.armator.service.AuthenticationService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthenticationRequest request, HttpServletResponse response ) {
        return ResponseEntity.ok((authenticationService.login(request, response)));
    }

}
