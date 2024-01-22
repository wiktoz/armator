package com.armator.repositoriy;

import com.armator.model.Cruise;
import com.armator.model.Ship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CruiseRepository extends JpaRepository<Cruise, Integer> {
    Optional<Cruise> findCruiseByCruiseId(Integer id);
    List<Cruise> findAllByShip(Ship ship);
    List<Cruise> findAll();
}
