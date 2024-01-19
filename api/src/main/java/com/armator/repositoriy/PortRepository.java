package com.armator.repositoriy;

import com.armator.model.Port;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PortRepository extends JpaRepository<Port, Integer> {
    Optional<Port> findByPortId(Integer id);
}
