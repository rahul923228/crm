package com.crm.User;



import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    

    @PostMapping("/login")
    public ResponseEntity<UserResponce> login(@RequestBody UserRequest responce){


        return ResponseEntity.ok(service.login(responce));


    }
    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody UserRequest request) {

        try {
        return ResponseEntity.ok(service.register(request));
    } catch (RuntimeException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("message",e.getMessage()));
    }
    }
    
}
