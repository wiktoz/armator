package com.armator.controller;


import com.armator.DTO.ship.Position.PositionResponse;
import com.armator.DTO.ship.Position.UpdatePositionReq;
import com.armator.DTO.ship.ShipResponse;
import com.armator.service.ShipService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/ship")
@RequiredArgsConstructor
public class ShipController {
    private final ShipService shipService;
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
}
