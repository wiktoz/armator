package com.armator.repositoriy;

import com.armator.model.Ship;
import com.armator.model.Shipowner;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ShipRepository extends JpaRepository<Ship, Integer> {
    Optional<Ship> findByName(String name);
    Optional<Ship> findByShipId(Integer id);
    List<Ship> findAll();
    Optional<Ship> findShipByShipOwner(Shipowner shipowner);
    List<Ship> findAllByShipOwner(Shipowner shipowner);


}
