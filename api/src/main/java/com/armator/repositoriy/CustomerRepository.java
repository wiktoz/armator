package com.armator.repositoriy;

import com.armator.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    Optional<Customer> findCustomerByCustomerId(Integer id);
    Optional<Customer> findCustomerByCompanyName(String companyName);
    Optional<Customer> findCustomerByEmail(String email);

}
