package com.armator.controller;


import com.armator.DTO.user.CreateWorkerReq;
import com.armator.model.Worker;
import com.armator.service.WorkerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user/worker")
@RequiredArgsConstructor
public class WorkerController {
    private final WorkerService workerService;
    @GetMapping("/{id}")
    public ResponseEntity<Worker> getWorker(@PathVariable Integer id) {
        return ResponseEntity.ok(workerService.getWorker(id));
    }

    @PostMapping("/")
    public ResponseEntity<Worker> createWorker(@RequestBody CreateWorkerReq req) {
        return ResponseEntity.ok(workerService.createWorker(req));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Worker> updateWorker(@PathVariable Integer id, @RequestBody CreateWorkerReq req) {
        return ResponseEntity.ok(workerService.updateWorker(id, req));
    }


}
