package com.armator.repositoriy;

import com.armator.model.Cruise;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CruiseRepository extends JpaRepository<Cruise, Integer> {
}
