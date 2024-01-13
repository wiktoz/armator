package com.armator.controller;


import com.armator.DTO.Message;
import com.armator.DTO.ship.AvailableShipsReq;
import com.armator.DTO.ship.CreateShipReq;
import com.armator.DTO.ship.Position.PositionResponse;
import com.armator.DTO.ship.Position.UpdatePositionReq;
import com.armator.DTO.ship.ShipResponse;
import com.armator.service.AvailabilityService;
import com.armator.service.ShipService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/ship")
@RequiredArgsConstructor
public class ShipController {
    private final ShipService shipService;
    private final AvailabilityService availabilityService;
    @GetMapping("/position/{id}")
    public ResponseEntity<PositionResponse> getPositionById(@PathVariable Integer id) {
        return ResponseEntity.ok(shipService.getPosition(id));
    }

    @PutMapping("/position/{id}")
    public ResponseEntity<PositionResponse> updatePosition(@PathVariable Integer id, @RequestBody UpdatePositionReq req) {
        return ResponseEntity.ok(shipService.updatePosition(id, req));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ShipResponse> getShipById(@PathVariable Integer id) {
        return ResponseEntity.ok(shipService.getShip(id));
    }

    @PostMapping("/")
    public ResponseEntity<ShipResponse> createShip(@RequestBody CreateShipReq req) {
        return ResponseEntity.ok(shipService.createShip(req));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ShipResponse> updateShip(@PathVariable Integer id, @RequestBody CreateShipReq req) {
        return ResponseEntity.ok(shipService.updateShip(id, req));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Message> deleteShip(@PathVariable Integer id) {
        return ResponseEntity.ok(shipService.deleteShip(id));
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllShips() {
        return ResponseEntity.ok(shipService.getAllShips());
    }
    @GetMapping("/shipowner/{id}")
    public ResponseEntity<?> getShipByShipOwnerId(@PathVariable Integer id) {
        return ResponseEntity.ok(shipService.getAllShipByShipOwnerId(id));
    }

    @PostMapping("/available/all")
    public ResponseEntity<?> getAvailableShips(@RequestBody AvailableShipsReq req) {
        return ResponseEntity.ok(availabilityService.getAvailableShips(req.getStartDate(), req.getEndDate(), req.getPortId()));
    }


}
