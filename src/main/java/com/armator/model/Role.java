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
@Table(name = "role", uniqueConstraints = @UniqueConstraint(columnNames = {"name"}))
public class Role {
    @Id
    @GeneratedValue
    private Integer roleId;
    private String name;
    private Integer salary;
}
