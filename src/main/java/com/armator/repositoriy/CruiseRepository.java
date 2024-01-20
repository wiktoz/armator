package com.armator.repositoriy;

import com.armator.model.Cruise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CruiseRepository extends JpaRepository<Cruise, Integer> {
    Optional<Cruise> findCruiseByCruiseId(Integer id);
    @Query("select c from Cruise c inner join Port  P on (c.srcPort= P) inner join Port P2 on (c.dstPort = P2) inner join Ship S on (c.ship = s)")
    List<Cruise> findCruises();
}
