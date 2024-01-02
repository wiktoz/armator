package com.armator.service;

import com.armator.model.Port;
import com.armator.repositoriy.PortRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;



@Service
@RequiredArgsConstructor
public class PortService {
    private final PortRepository portRepository;

    public Port getPort(Integer id) {
        return portRepository.findByPortId(id).orElseThrow(() -> new RuntimeException("Port not found"));
    }

    public Port createPort(Port req) {
        var port = Port.builder()
                .street(req.getStreet())
                .city(req.getCity())
                .zipCode(req.getZipCode())
                .maxLoadsNumber(req.getMaxLoadsNumber())
                .loadsNumber(req.getLoadsNumber())
                .build();
        portRepository.save(port);
        return port;
    }
}
