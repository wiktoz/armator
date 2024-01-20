package com.armator.service;


import com.armator.DTO.cruise.CreateCruiseReq;
import com.armator.model.Cruise;
import com.armator.model.Worker;
import com.armator.repositoriy.CruiseRepository;
import com.armator.repositoriy.PortRepository;
import com.armator.repositoriy.ShipRepository;
import com.armator.repositoriy.WorkerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class  CruiseService {
    private final CruiseRepository cruiseRepository;
    private final ShipRepository shipRepository;
    private final WorkerRepository workerRepository;
    private final PortRepository portRepository;

    public Cruise getCruise(Integer id) {
        return cruiseRepository.findCruiseByCruiseId(id).orElseThrow( () -> new RuntimeException("Cruise not found"));
    }

    public Cruise createCruise(CreateCruiseReq req) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

        Set<Worker> workers = req.getWorkersIds().stream().map( id -> {
            return workerRepository.findByWorkerId(id).orElseThrow( () -> new RuntimeException("Worker not found"));
        }).collect(Collectors.toSet());
        var ship = shipRepository.findByShipId(req.getShipId()).orElseThrow( () -> new RuntimeException("Ship not found"));
        var srcPort = portRepository.findByPortId(req.getSrcPortId()).orElseThrow( () -> new RuntimeException("Port not found"));
        var dstPort = portRepository.findByPortId(req.getDstPortId()).orElseThrow( () -> new RuntimeException("Port not found"));
        var startDate = LocalDateTime.parse(req.getStartDate(), formatter);
        var endDate = LocalDateTime.parse(req.getEndDate(), formatter);
        var cruise = Cruise.builder()
                .ship(ship)
                .workers(workers)
                .srcPort(srcPort)
                .dstPort(dstPort)
                .startDate(startDate)
                .endDate(endDate)
                .routeLength(req.getRouteLength())
                .loadsNumber(req.getLoadsNumber())
                .build();

        cruiseRepository.save(cruise);
        return cruise;
    }

    public Cruise updateCruise(Integer id, CreateCruiseReq req) {
        var cruise = cruiseRepository.findCruiseByCruiseId(id).orElseThrow( () -> new RuntimeException("Cruise not found"));

        if (req.getShipId() != null) {
            var ship = shipRepository.findByShipId(req.getShipId()).orElseThrow( () -> new RuntimeException("Ship not found"));
            cruise.setShip(ship);
        }
        if (req.getSrcPortId() != null) {
            var srcPort = portRepository.findByPortId(req.getSrcPortId()).orElseThrow( () -> new RuntimeException("Port not found"));
            cruise.setSrcPort(srcPort);
        }
        if (req.getDstPortId() != null) {
            var dstPort = portRepository.findByPortId(req.getDstPortId()).orElseThrow( () -> new RuntimeException("Port not found"));
            cruise.setDstPort(dstPort);
        }
        if (req.getStartDate() != null) {
            var startDate = LocalDateTime.parse(req.getStartDate());
            cruise.setStartDate(startDate);
        }
        if (req.getEndDate() != null) {
            var endDate = LocalDateTime.parse(req.getEndDate());
            cruise.setEndDate(endDate);
        }
        if (req.getRouteLength() != null) {
            cruise.setRouteLength(req.getRouteLength());
        }
        if (req.getLoadsNumber() != null) {
            cruise.setLoadsNumber(req.getLoadsNumber());
        }
        if (req.getWorkersIds() != null) {
            Set<Worker> workers = req.getWorkersIds().stream().map( workerId -> {
                return workerRepository.findByWorkerId(workerId).orElseThrow( () -> new RuntimeException("Worker not found"));
            }).collect(Collectors.toSet());
            cruise.setWorkers(workers);
        }
        cruiseRepository.save(cruise);
        return cruise;
    }
}
