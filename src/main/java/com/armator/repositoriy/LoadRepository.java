package com.armator.repositoriy;

import com.armator.model.Load;
import com.armator.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface LoadRepository extends JpaRepository<Load, Integer> {
    List<Load> findAll();
    Optional<Load> findLoadByLoadId(Integer id);
    List<Load> findAllByUser(User user);
    @Query("select l from Load l inner join User U on  l.user = U inner join Port  P on (l.srcPortId = P) inner join Port P2 on (l.dstPortId = P2) WHERE UPPER(U.lastname) like UPPER(CONCAT(:searchString,'%')) OR UPPER(U.firstname) like UPPER(CONCAT(:searchString,'%')) OR UPPER(P.city) like UPPER(CONCAT(:searchString,'%')) OR UPPER(P.zipCode) like UPPER(CONCAT(:searchString,'%')) OR UPPER(P2.city) like UPPER(CONCAT(:searchString,'%')) OR UPPER(P2.zipCode) like UPPER(CONCAT(:searchString,'%')) OR UPPER(l.content) like UPPER(CONCAT('%',:searchString,'%'))")
    List<Load> loadSearch(@Param("searchString") String searchString);
}
