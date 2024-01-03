package com.armator.controller;


import com.armator.DTO.user.UpdateUser;
import com.armator.DTO.user.UserResponse;
import com.armator.model.User;
import com.armator.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/id/{id}")
    //@PreAuthorize("#id == authentication.principal.id")
    public ResponseEntity<User> getUserById(@PathVariable Integer id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PutMapping("/id/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Integer id, @RequestBody UpdateUser req) {
        return ResponseEntity.ok(userService.updateUser(id, req));
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        return ResponseEntity.ok(userService.getUserByEmail(email));
    }

    @GetMapping("/me")
    public ResponseEntity<User> getMe(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(userService.getMe(token));
    }
}
