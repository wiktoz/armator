package com.armator.service;


import com.armator.DTO.Message;
import com.armator.DTO.ship.CreateShipReq;
import com.armator.DTO.ship.DeleteResponse;
import com.armator.DTO.ship.Position.PositionResponse;
import com.armator.DTO.ship.Position.UpdatePositionReq;
import com.armator.DTO.ship.ShipResponse;
import com.armator.model.Ship;
import com.armator.repositoriy.ShipRepository;
import com.armator.repositoriy.ShipownerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ShipService {
    private final ShipRepository shipRepository;
    private final ShipownerRepository shipownerRepository;


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
                    .shipOwnerId(ship.getShipOwner().getShipOwnerId())

                    .build();
    }

    public ShipResponse createShip(CreateShipReq req) {
        var newShip = Ship.builder()
                    .name(req.getName())
                    .flag(req.getFlag())
                    .maxLoadsNumber(req.getMaxLoadsNumber())
                    .maxFuelCapacity(req.getMaxFuelCapacity())
                    .maxKnots(req.getMaxKnots())
                    .latitude(req.getLatitude())
                    .longitude(req.getLongitude())
                    .build();
        shipRepository.save(newShip);
        return ShipResponse.builder()
                    .shipId(newShip.getShipId())
                    .name(newShip.getName())
                    .flag(newShip.getFlag())
                    .maxLoadsNumber(newShip.getMaxLoadsNumber())
                    .maxFuelCapacity(newShip.getMaxFuelCapacity())
                    .maxKnots(newShip.getMaxKnots())
                    .latitude(newShip.getLatitude())
                    .longitude(newShip.getLongitude())
                    .shipOwnerId(newShip.getShipOwner().getShipOwnerId())
                    .isAvailable(true)
                    .isFar(false)
                    .build();
    }

    public ShipResponse updateShip(Integer id, CreateShipReq req) {
        var ship = shipRepository.findByShipId(id).orElseThrow( () -> new RuntimeException("Ship not found"));
        ship.setName(req.getName());
        ship.setFlag(req.getFlag());
        ship.setMaxLoadsNumber(req.getMaxLoadsNumber());
        ship.setMaxFuelCapacity(req.getMaxFuelCapacity());
        ship.setMaxKnots(req.getMaxKnots());
        ship.setLatitude(req.getLatitude());
        ship.setLongitude(req.getLongitude());
        shipRepository.save(ship);
        return ShipResponse.builder()
                    .shipId(ship.getShipId())
                    .name(ship.getName())
                    .flag(ship.getFlag())
                    .maxLoadsNumber(ship.getMaxLoadsNumber())
                    .maxFuelCapacity(ship.getMaxFuelCapacity())
                    .maxKnots(ship.getMaxKnots())
                    .latitude(ship.getLatitude())
                    .longitude(ship.getLongitude())
                    .shipOwnerId(ship.getShipOwner().getShipOwnerId())
                    .build();
    }

    public DeleteResponse deleteShip(Integer id) {
        Ship ship = null;
        try{
            ship = shipRepository.findByShipId(id).orElseThrow( () -> new RuntimeException("Ship not found"));
        }
        catch (Exception e){
            return DeleteResponse.builder()
                        .message("Ship not deleted. Error: Ship not found.")
                        .deleted(false)
                        .build();
        }
        try{
            shipRepository.delete(ship);
        } catch (Exception e){
            return DeleteResponse.builder()
                        .message("Ship not deleted. Error: Data integrity violation.")
                        .deleted(false)
                        .build();
        }

        return DeleteResponse.builder()
                    .message("Ship deleted")
                    .deleted(true)
                    .build();
    }

    public List<Ship> getAllShips() {
        return  shipRepository.findAll();
    }

    public List<Ship> getAllShipByShipOwnerId(Integer id) {
        var shipowner = shipownerRepository.findByShipOwnerId(id).orElseThrow( () -> new RuntimeException("Shipowner not found"));
        return shipRepository.findAllByShipOwner(shipowner);
    }
}
