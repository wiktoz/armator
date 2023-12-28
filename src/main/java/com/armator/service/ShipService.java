package com.armator.service;


import com.armator.DTO.ship.Position.PositionResponse;
import com.armator.DTO.ship.Position.UpdatePositionReq;
import com.armator.DTO.ship.ShipResponse;
import com.armator.repositoriy.ShipRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ShipService {
    private final ShipRepository shipRepository;

    public PositionResponse getPosition(Integer id) {
        var ship = shipRepository.findByShipId(id).orElseThrow( () -> new RuntimeException("Ship not found"));
        return PositionResponse.builder()
                    .latitude(ship.getLatitude())
                    .longitude(ship.getLongitude())
                    .build();
    }

    public PositionResponse updatePosition(Integer id, UpdatePositionReq req){
        var ship = shipRepository.findByShipId(id).orElseThrow( () -> new RuntimeException("Ship not found"));
        ship.setLatitude(req.getLatitude());
        ship.setLongitude(req.getLongitude());
        shipRepository.save(ship);
        return PositionResponse.builder()
                    .latitude(ship.getLatitude())
                    .longitude(ship.getLongitude())
                    .build();
    }

    public ShipResponse getShip(Integer id) {
        var ship = shipRepository.findByShipId(id).orElseThrow( () -> new RuntimeException("Ship not found"));
        return ShipResponse.builder()
                    .shipId(ship.getShipId())
                    .name(ship.getName())
                    .flag(ship.getFlag())
                    .maxLoadsNumber(ship.getMaxLoadsNumber())
                    .maxFuelCapacity(ship.getMaxFuelCapacity())
                    .maxKnots(ship.getMaxKnots())
                    .latitude(ship.getLatitude())
                    .longitude(ship.getLongitude())
                    .build();
    }
}
