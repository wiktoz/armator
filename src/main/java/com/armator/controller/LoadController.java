package com.armator.controller;


import com.armator.DTO.load.AssignRequest;
import com.armator.DTO.load.CreateLoadReq;
import com.armator.DTO.load.SearchRequest;
import com.armator.service.LoadService;
import com.armator.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/load")
@RequiredArgsConstructor
public class LoadController {

    private final LoadService loadService;
    private final SearchService searchService;
    @GetMapping("/all")
    public ResponseEntity<?> getAllLoads(){
        return ResponseEntity.ok(loadService.getAllLoads());
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<?> getLoadById(@PathVariable Integer id){
        return ResponseEntity.ok(loadService.getLoadById(id));
    }

    @PostMapping("/")
    public ResponseEntity<?> createLoad(@RequestBody CreateLoadReq req, @RequestHeader("Authorization") String token){
        return ResponseEntity.ok(loadService.createLoad(req,token));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getMyLoads(@RequestHeader("Authorization") String token){
        return ResponseEntity.ok(loadService.getMyLoads(token));
    }


    @GetMapping("/user/{id}")
    public ResponseEntity<?> getLoadsByUserId(@PathVariable Integer id){
        return ResponseEntity.ok(loadService.getLoadsByUserId(id));
    }

    @PutMapping("/assign")
    public ResponseEntity<?> assignLoad(@RequestBody AssignRequest request){
        return ResponseEntity.ok(loadService.assignLoad(request));
    }

    @PostMapping("/search")
    public ResponseEntity<?> searchLoad(@RequestBody SearchRequest req){
        return ResponseEntity.ok(searchService.searchLoad(req.getSearchString()));
    }


}
