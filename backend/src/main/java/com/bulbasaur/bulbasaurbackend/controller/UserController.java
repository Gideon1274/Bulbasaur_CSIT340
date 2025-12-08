package com.bulbasaur.bulbasaurbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bulbasaur.bulbasaurbackend.model.LoginRequest;
import com.bulbasaur.bulbasaurbackend.model.User;
import com.bulbasaur.bulbasaurbackend.service.UserService;

import java.util.Map;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        try {
            boolean userExists = userService.findUserByEmailAndPassword(email, password);
            if (userExists) {
                return ResponseEntity.ok().body(true);
            }
            return ResponseEntity.status(401).body(false);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Login failed: " + e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        try {
            // basic validation
            if (user == null || user.getEmail() == null || user.getEmail().trim().isEmpty()
                    || user.getPassword() == null || user.getPassword().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Email and password are required");
            }

            // log incoming user (without password in logs)
            System.out.println("Register request for: " + user.getEmail() + ", name=" + user.getFirstName() + " "
                    + user.getLastName());

            // prevent duplicate emails
            if (userService.checkEmailExists(user.getEmail())) {
                return ResponseEntity.status(409).body("Email already exists");
            }

            userService.saveUser(user);
            return ResponseEntity.ok().body(true);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to register user: " + e.getMessage());
        }
    }

    @PostMapping("/checkEmail")
    public ResponseEntity<Boolean> checkEmailExists(@RequestBody Map<String, String> requestBody) {
        String email = requestBody.get("email");
        boolean emailExists = userService.checkEmailExists(email);
        return ResponseEntity.ok(emailExists);
    }

}
