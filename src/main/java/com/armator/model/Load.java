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
@Table(name = "load")
public class Load {
    @Id
    @GeneratedValue
    private Integer loadId;
    private String content;
    private Double weight;
    private Double price;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "customerId")
    private Customer customer;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "srcPortId")
    private Port srcPortId;
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "dstPortId")
    private Port dstPortId;
    private String status;
}
