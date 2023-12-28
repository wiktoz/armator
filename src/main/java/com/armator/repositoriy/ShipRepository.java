package com.armator.repositoriy;

import com.armator.model.Ship;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ShipRepository extends JpaRepository<Ship, Long> {
    Optional<Ship> findByName(String name);
    Optional<Ship> findByShipId(Integer id);


}
