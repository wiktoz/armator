package com.armator.service;

import com.armator.model.Customer;
import com.armator.repositoriy.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomerService {
    private final CustomerRepository customerRepository;
    public Customer getCustomerById(Integer id) {
        return customerRepository.findCustomerByCustomerId(id).orElseThrow(() -> new RuntimeException("Customer not found"));
    }
    public Customer getCustomerByCompanyName(String companyName) {
        return customerRepository.findCustomerByCompanyName(companyName).orElseThrow(() -> new RuntimeException("Customer not found"));
    }
}
