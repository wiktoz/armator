package com.armator.controller;

import com.armator.DTO.cruise.CreateCruiseReq;
import com.armator.model.Cruise;
import com.armator.service.CruiseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/cruise")
@RequiredArgsConstructor
public class CruiseController {
    private final CruiseService cruiseService;
    @GetMapping("/{id}")
    public ResponseEntity<Cruise> getCruise(@PathVariable Integer id) {
        return ResponseEntity.ok(cruiseService.getCruise(id));
    }

    @PostMapping("/")
    public ResponseEntity<Cruise> createCruise(@RequestBody CreateCruiseReq req) {
        return ResponseEntity.ok(cruiseService.createCruise(req));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cruise> updateCruise(@PathVariable Integer id, @RequestBody CreateCruiseReq req) {
        return ResponseEntity.ok(cruiseService.updateCruise(id, req));
    }
}
