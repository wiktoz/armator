package com.armator.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Value;



import java.util.Set;

@Value
public class SignUpDTO {

    @NotBlank(message = "username is required")
    @Size(min = 3, max = 20)
    String username;

    @NotBlank(message = "email is required")
    @Size(max = 50)
    @Email
    String email;

    Set<String> roles;

    @NotBlank(message = "password is required")
    @Size(min = 6, max = 40)
    String password;

}