package com.armator.controller;


import com.armator.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/api/v1/customer")
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerController {
    private final CustomerService customerService;
    @GetMapping("/{id}")
    public ResponseEntity<?> getCustomerById(@PathVariable Integer id){
        return ResponseEntity.ok(customerService.getCustomerById(id));
    }

    @GetMapping("/company/{companyName}")
    public ResponseEntity<?> getCustomerByCompanyName(@PathVariable String companyName){
        return ResponseEntity.ok(customerService.getCustomerByCompanyName(companyName));
    }

}
