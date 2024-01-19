package com.armator.controller;


import com.armator.model.Port;
import com.armator.service.PortService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/port")
@RequiredArgsConstructor
public class PortController {
    private final PortService portService;
    @GetMapping("/{id}")
    public ResponseEntity<Port> getPort(@PathVariable Integer id) {
        return ResponseEntity.ok(portService.getPort(id));
    }

    @PostMapping("/")
    public ResponseEntity<Port> createPort(@RequestBody Port req) {
        return ResponseEntity.ok(portService.createPort(req));
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllPorts(){
        return ResponseEntity.ok(portService.getAllPorts());
    }
}
