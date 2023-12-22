package com.armator.dto;


import jakarta.validation.constraints.NotBlank;
import lombok.Value;


@Value
public class LoginDTO {
    @NotBlank
    String username;
    @NotBlank
    String password;

}
