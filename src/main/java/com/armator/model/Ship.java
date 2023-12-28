package com.armator.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.NonNull;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "ship", uniqueConstraints = @UniqueConstraint(columnNames = {"name"}))
public class Ship {
    @Id
    @GeneratedValue
    private Integer shipId;
    private String name;
    private String flag;
    private Integer maxLoadsNumber;
    private Integer maxFuelCapacity;
    private Integer maxKnots;

    private Double latitude;
    private Double longitude;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "shipOwnerId")
    private Shipowner shipOwner;



}
