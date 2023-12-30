package com.armator.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "worker")
public class Worker {
    @Id
    @GeneratedValue
    private Integer workerId;
    private String email;
    private String phoneNumber;
    private String backAccountId;
    private String idCardNumber;
    private String city;
    private String street;
    private String zipCode;
    private String houseNumber;
    private String flatNumber;
    @OneToOne
    private User user;
    @OneToOne
    private Role role;
    @ManyToMany
    @JoinTable(
            name = "worker_cruise",
            joinColumns = @JoinColumn(name = "workerId"),
            inverseJoinColumns = @JoinColumn(name = "cruiseId"))
    private Set<Cruise> cruises;

}
