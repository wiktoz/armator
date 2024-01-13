package com.armator.DTO.ship;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AvailableShipsReq {
    private Integer portId;
    private String startDate;
    private String endDate;
}
