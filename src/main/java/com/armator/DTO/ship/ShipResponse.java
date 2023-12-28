package com.armator.DTO.ship;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ShipResponse {
    private Integer shipId;
    private String name;
    private String flag;
    private Integer maxLoadsNumber;
    private Integer maxFuelCapacity;
    private Integer maxKnots;

    private Double latitude;
    private Double longitude;
}
