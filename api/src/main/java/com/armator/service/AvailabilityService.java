package com.armator.service;

import com.armator.DTO.ship.ShipResponse;
import com.armator.model.Cruise;
import com.armator.repositoriy.CruiseRepository;
import com.armator.repositoriy.PortRepository;
import com.armator.repositoriy.ShipRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AvailabilityService {
    private final CruiseRepository cruiseRepository;
    private final PortRepository portRepository;
    private final ShipRepository shipRepository;
    public List<ShipResponse> getAvailableShips(String startDate, String EndDate, Integer dstPortid){
        List<ShipResponse> shipResponses = new ArrayList<>();
        List<Cruise> cruises = cruiseRepository.findAll();
        var dstPort = portRepository.findByPortId(dstPortid).orElseThrow( () -> new RuntimeException("Port not found"));
        var ships = shipRepository.findAll();
        var shipsInCruises = cruises.stream().map(Cruise::getShip).toList();
        var availableShips = ships.stream().filter(ship -> !shipsInCruises.contains(ship)).toList();
        for (var cruise: cruises){
            var response = ShipResponse.builder()
                    .shipId(cruise.getShip().getShipId())
                    .name(cruise.getShip().getName())
                    .flag(cruise.getShip().getFlag())
                    .maxLoadsNumber(cruise.getShip().getMaxLoadsNumber())
                    .maxFuelCapacity(cruise.getShip().getMaxFuelCapacity())
                    .maxKnots(cruise.getShip().getMaxKnots())
                    .latitude(cruise.getShip().getLatitude())
                    .longitude(cruise.getShip().getLongitude())
                    .shipOwnerId(cruise.getShip().getShipOwner().getShipOwnerId())
                    .isAvailable(true)
                    .isFar(false)
                    .build();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
            if ((((LocalDateTime.parse(startDate,formatter).isAfter(cruise.getStartDate()) || LocalDateTime.parse(startDate,formatter).isEqual(cruise.getStartDate())))
                    && (LocalDateTime.parse(EndDate,formatter).isBefore(cruise.getEndDate()) || LocalDateTime.parse(EndDate,formatter).isEqual(cruise.getEndDate())))
                    || ((LocalDateTime.parse(EndDate,formatter)).isAfter(cruise.getStartDate()) && (LocalDateTime.parse(EndDate,formatter)).isBefore(cruise.getEndDate()))
                    || ((LocalDateTime.parse(startDate,formatter)).isAfter(cruise.getStartDate()) && (LocalDateTime.parse(startDate,formatter)).isBefore(cruise.getEndDate()))){
                response.setIsAvailable(false);
            }
            if (calculateDistance(dstPort.getLatitude(),dstPort.getLongitude(),cruise.getDstPort().getLatitude(), cruise.getDstPort().getLongitude())>200.0){
                response.setIsFar(true);
            }
            shipResponses.add(response);
        }
        for (var ship: availableShips){
            var response = ShipResponse.builder()
                    .shipId(ship.getShipId())
                    .name(ship.getName())
                    .flag(ship.getFlag())
                    .maxLoadsNumber(ship.getMaxLoadsNumber())
                    .maxFuelCapacity(ship.getMaxFuelCapacity())
                    .maxKnots(ship.getMaxKnots())
                    .latitude(ship.getLatitude())
                    .longitude(ship.getLongitude())
                    .shipOwnerId(ship.getShipOwner().getShipOwnerId())
                    .isAvailable(true)
                    .isFar(false)
                    .build();
            if (calculateDistance(dstPort.getLatitude(),dstPort.getLongitude(),ship.getLatitude(), ship.getLongitude())>200.0){
                response.setIsFar(true);
            }
            shipResponses.add(response);
        }
        return shipResponses;

    }

    public double calculateDistance(double lat1, double lon1, double lat2, double lon2) {
        double R = 6371e3; // metres
        double ph1 = Math.toRadians(lat1);
        double ph2 = Math.toRadians(lat2);
        double deltaPh = Math.toRadians(lat2-lat1);
        double deltaLon = Math.toRadians(lon2-lon1);
        double a = Math.sin(deltaPh/2) * Math.sin(deltaPh/2) +
                Math.cos(ph1) * Math.cos(ph2) *
                        Math.sin(deltaLon/2) * Math.sin(deltaLon/2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c / 1000;
    }
}
