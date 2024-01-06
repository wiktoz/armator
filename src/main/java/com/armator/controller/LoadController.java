package com.armator.controller;


import com.armator.DTO.load.CreateLoadReq;
import com.armator.service.LoadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/load")
@RequiredArgsConstructor
public class LoadController {

    private final LoadService loadService;
    @GetMapping("/all")
    public ResponseEntity<?> getAllLoads(){
        return ResponseEntity.ok(loadService.getAllLoads());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getLoadById(@PathVariable Integer id){
        return ResponseEntity.ok(loadService.getLoadById(id));
    }

    @PostMapping("/")
    public ResponseEntity<?> createLoad(@RequestBody CreateLoadReq req, @RequestHeader("Authorization") String token){
        return ResponseEntity.ok(loadService.createLoad(req,token));
    }
}
