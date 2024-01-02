package com.armator.repositoriy;

import com.armator.model.Cruise;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CruiseRepository extends JpaRepository<Cruise, Integer> {
    Optional<Cruise> findCruiseByCruiseId(Integer id);
}
