package com.armator.service;


import com.armator.DTO.user.CreateWorkerReq;
import com.armator.model.Worker;
import com.armator.repositoriy.RoleRepository;
import com.armator.repositoriy.UserRepository;
import com.armator.repositoriy.WorkerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WorkerService {
    private final WorkerRepository workerRepository;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    public Worker getWorker(Integer id) {
        return workerRepository.findByWorkerId(id).orElseThrow( () -> new RuntimeException("Worker not found"));
    }

    public Worker createWorker(CreateWorkerReq req) {
        var role = roleRepository.findByName(req.getRole()).orElseThrow( () -> new RuntimeException("Role not found"));
        var user = userRepository.findByEmail(req.getEmail()).orElseThrow( () -> new RuntimeException("User not found"));
        return Worker.builder()
                .email(req.getEmail())
                .role(role)
                .user(user)
                .backAccountId(req.getBackAccountId())
                .idCardNumber(req.getIdCardNumber())
                .phoneNumber(req.getPhoneNumber())
                .city(req.getCity())
                .street(req.getStreet())
                .zipCode(req.getZipCode())
                .houseNumber(req.getHouseNumber())
                .flatNumber(req.getFlatNumber())
                .build();


    }

    public Worker updateWorker(Integer id, CreateWorkerReq req) {
        var worker = workerRepository.findByWorkerId(id).orElseThrow( () -> new RuntimeException("Worker not found"));
        var role = roleRepository.findByName(req.getRole()).orElseThrow( () -> new RuntimeException("Role not found"));
        var user = userRepository.findByEmail(req.getEmail()).orElseThrow( () -> new RuntimeException("User not found"));
        if(req.getBackAccountId() != null) {
            worker.setBackAccountId(req.getBackAccountId());
        }
        if(req.getCity() != null) {
            worker.setCity(req.getCity());
        }
        if(req.getEmail() != null) {
            worker.setEmail(req.getEmail());
        }
        if(req.getFlatNumber() != null) {
            worker.setFlatNumber(req.getFlatNumber());
        }
        if(req.getHouseNumber() != null) {
            worker.setHouseNumber(req.getHouseNumber());
        }
        if(req.getIdCardNumber() != null) {
            worker.setIdCardNumber(req.getIdCardNumber());
        }
        if(req.getPhoneNumber() != null) {
            worker.setPhoneNumber(req.getPhoneNumber());
        }
        if(req.getStreet() != null) {
            worker.setStreet(req.getStreet());
        }
        if(req.getZipCode() != null) {
            worker.setZipCode(req.getZipCode());
        }
        if(req.getRole() != null) {
            worker.setRole(role);
        }
        if(req.getEmail() != null) {
            worker.setUser(user);
        }
        return workerRepository.save(worker);
    }
}
