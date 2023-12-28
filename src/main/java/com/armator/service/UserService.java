package com.armator.service;


import com.armator.DTO.user.UpdateUser;
import com.armator.DTO.user.UserResponse;
import com.armator.repositoriy.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public UserResponse getUserById(Integer id) {

        var user = userRepository.findById(id).orElseThrow( () -> new RuntimeException("User not found"));

        return UserResponse.builder()
                    .id(user.getId())
                    .firstname(user.getFirstname())
                    .lastname(user.getLastname())
                    .email(user.getEmail())
                    .build();

    }

    public UserResponse updateUser(Integer id, UpdateUser req) {
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

        return UserResponse.builder()
                    .id(user.getId())
                    .firstname(user.getFirstname())
                    .lastname(user.getLastname())
                    .email(user.getEmail())
                    .build();

    }
}
