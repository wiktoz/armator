package com.armator.DTO.load;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GetLoadResponse {
    private Integer loadId;
    private String content;
    private Double weight;
    private Double price;
    private Integer customerId;
    private Integer srcPortId;
    private Integer dstPortId;
    private String status;
    private Integer cruiseId;
}
