package com.armator.DTO.cruise;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateCruiseReq {
    private String startDate;
    private String endDate;
    private Double routeLength;
    private Integer loadsNumber;
    private Integer shipId;
    private Integer srcPortId;
    private Integer dstPortId;
    private List<Integer> workersIds;
}
