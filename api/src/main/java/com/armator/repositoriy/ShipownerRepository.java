package com.armator.repositoriy;

import com.armator.model.Shipowner;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ShipownerRepository extends JpaRepository<Shipowner, Integer> {
    Optional<Shipowner> findByShipOwnerId(Integer id);
}
