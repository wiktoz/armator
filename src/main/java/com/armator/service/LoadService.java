package com.armator.service;


import com.armator.DTO.load.AssignRequest;
import com.armator.DTO.load.CreateLoadReq;
import com.armator.DTO.load.GetLoadResponse;
import com.armator.exceptions.NoSuchLoadException;
import com.armator.model.Load;
import com.armator.repositoriy.CruiseRepository;
import com.armator.repositoriy.CustomerRepository;
import com.armator.repositoriy.LoadRepository;
import com.armator.repositoriy.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LoadService {
    private final LoadRepository loadRepository;
    private final UserRepository userRepository;
    private final CruiseRepository cruiseRepository;
    private final JwtService jwtService;
    private final PortService portService;
    public List<Load> getAllLoads() {
        return loadRepository.findAll();
    }

    public Load getLoadById(Integer id) {
        return loadRepository.findLoadByLoadId(id).orElseThrow(() -> new NoSuchLoadException("Load not found"));
    }

    public Load createLoad(CreateLoadReq req, String token) {
        var customer = userRepository.findByEmail(jwtService.extractEmail(token.substring(7))).orElseThrow(() -> new RuntimeException("Customer not found"));
        return loadRepository.save(Load.builder()
                .user(customer)
                .content(req.getContent())
                .price(req.getPrice())
                .weight(req.getWeight())
                .status(req.getStatus())
                .srcPortId(portService.getPort(req.getSrcPortId()))
                .dstPortId(portService.getPort(req.getDstPortId()))
                //.cruise(cruiseRepository.findById(1).orElseThrow(() -> new RuntimeException("Cruise not found"))) // TODO: handle cruise
                .build());
    }

    public List<Load> getMyLoads(String token) {
        var customer = userRepository.findByEmail(jwtService.extractEmail(token.substring(7))).orElseThrow(() -> new RuntimeException("Customer not found"));
        return loadRepository.findAllByUser(customer);
    }

    public List<Load> getLoadsByUserId(Integer id) {
        var customer = userRepository.findById(id).orElseThrow(() -> new RuntimeException("Customer not found"));
        return loadRepository.findAllByUser(customer);
    }

    public Load assignLoad(AssignRequest request) {
        var cruise = cruiseRepository.findById(request.getCruiseId()).orElseThrow(() -> new RuntimeException("Cruise not found"));
        var load = loadRepository.findLoadByLoadId(request.getLoadId()).orElseThrow(() -> new RuntimeException("Load not found"));
        load.setCruise(cruise);
        return loadRepository.save(load);
    }
}
