package com.armator.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "cruise")
public class Cruise {
    @Id
    @GeneratedValue
    private Integer cruiseId;
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime startDate;
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime endDate;
    private Double routeLength;
    private Integer loadsNumber;
    @ManyToOne
    @JoinColumn(name = "shipId")
    private Ship ship;
    @ManyToOne
    @JoinColumn(name = "srcPortId")
    private Port srcPort;
    @ManyToOne
    @JoinColumn(name = "dstPortId")
    private Port dstPort;
    @ManyToMany(mappedBy = "cruises")
    private Set<Worker> workers;


}
