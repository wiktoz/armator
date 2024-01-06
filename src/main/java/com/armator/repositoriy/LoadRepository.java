package com.armator.repositoriy;

import com.armator.model.Load;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LoadRepository extends JpaRepository<Load, Integer> {
    List<Load> findAll();
    Optional<Load> findLoadByLoadId(Integer id);
}
