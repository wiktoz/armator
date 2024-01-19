package com.armator.DTO.load;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AssignRequest {
    private Integer loadId;
    private Integer cruiseId;
    private Double price;
}
