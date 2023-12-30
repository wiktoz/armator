package com.armator.repositoriy;

import com.armator.model.Worker;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WorkerRepository extends JpaRepository<Worker, Integer> {
    Optional<Worker> findByWorkerId(Integer id);
}
