package com.armator.service;


import com.armator.DTO.user.UpdateUser;
import com.armator.DTO.user.UserResponse;
import com.armator.model.User;
import com.armator.repositoriy.UserRepository;
import io.jsonwebtoken.Jwt;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final JwtService jwtService;
    public User getUserById(Integer id) {

        return userRepository.findById(id).orElseThrow( () -> new RuntimeException("User not found"));

    }

    public User updateUser(Integer id, UpdateUser req) {
        var user= userRepository.findById(id).orElseThrow( () -> new RuntimeException("User not found"));

        if(Objects.nonNull(req.getFirstname())) {
            user.setFirstname(req.getFirstname());
        }
        if(Objects.nonNull(req.getLastname())) {
            user.setLastname(req.getLastname());
        }
        if(Objects.nonNull(req.getEmail())) {
            user.setEmail(req.getEmail());
        }

        userRepository.save(user);

        return user;

    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow( () -> new RuntimeException("User not found"));
    }

    public User getMe(String token) {
        var email = jwtService.extractEmail(token.substring(7));
        return getUserByEmail(email);
    }
}
