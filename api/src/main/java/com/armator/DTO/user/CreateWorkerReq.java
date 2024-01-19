package com.armator.DTO.user;


import com.armator.model.Cruise;
import com.armator.model.Role;
import com.armator.model.User;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateWorkerReq {
    private String email;
    private String phoneNumber;
    private String backAccountId;
    private String idCardNumber;
    private String city;
    private String street;
    private String zipCode;
    private String houseNumber;
    private String flatNumber;
    private String role;

}
