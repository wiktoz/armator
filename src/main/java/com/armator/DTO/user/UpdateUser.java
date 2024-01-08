package com.armator.DTO.user;

import com.armator.model.SecurityRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUser {
    private String firstname;
    private String lastname;
    private String email;
    private String city;
    private String street;
    private String zipCode;
    private String houseNumber;
    private String flatNumber;
}
