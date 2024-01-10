package com.armator.DTO.load;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateLoadReq {
    private String content;
    private Double weight;
    private Integer srcPortId;
    private Integer dstPortId;
}
