package com.armator.service;


import com.armator.DTO.load.CreateLoadReq;
import com.armator.DTO.load.GetLoadResponse;
import com.armator.exceptions.NoSuchLoadException;
import com.armator.model.Load;
import com.armator.repositoriy.CustomerRepository;
import com.armator.repositoriy.LoadRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LoadService {
    private final LoadRepository loadRepository;
    private final CustomerRepository customerRepository;
    private final JwtService jwtService;
    private final PortService portService;
    public List<Load> getAllLoads() {
        return loadRepository.findAll();
    }

    public GetLoadResponse getLoadById(Integer id) {
        var load =  loadRepository.findLoadByLoadId(id).orElseThrow(() -> new NoSuchLoadException("Load not found"));
        return GetLoadResponse.builder().
                loadId(load.getLoadId())
                .content(load.getContent())
                .price(load.getPrice())
                .weight(load.getWeight())
                .customerId(load.getCustomer().getCustomerId())
                .status(load.getStatus())
                .srcPortId(load.getSrcPortId().getPortId())
                .dstPortId(load.getDstPortId().getPortId())
                .build();
    }

    public Load createLoad(CreateLoadReq req, String token) {
        var customer = customerRepository.findCustomerByEmail(jwtService.extractEmail(token.substring(7))).orElseThrow(() -> new RuntimeException("Customer not found"));
        return loadRepository.save(Load.builder()
                .customer(customer)
                .content(req.getContent())
                .price(req.getPrice())
                .weight(req.getWeight())
                .status(req.getStatus())
                .srcPortId(portService.getPort(req.getSrcPortId()))
                .dstPortId(portService.getPort(req.getDstPortId()))
                .build());
    }
}
