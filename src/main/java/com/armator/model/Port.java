package com.armator.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "port")
public class Port {
    @Id
    @GeneratedValue
    private Integer portId;
    private String city;
    private String street;
    private String zipCode;
    private Integer maxLoadsNumber;
    private Integer loadsNumber;
    private Double latitude;
    private Double longitude;
}
