package com.armator.repositoriy;

import com.armator.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
    Optional<User> findById(Integer id);
    List<User> findAll();
    @Query("select U from User U  WHERE UPPER(U.lastname) like UPPER(CONCAT(:searchString,'%')) OR UPPER(U.firstname) like UPPER(CONCAT(:searchString,'%')) OR U.email like :searchString")
    List<User> userSearch(@Param("searchString") String searchString);
}