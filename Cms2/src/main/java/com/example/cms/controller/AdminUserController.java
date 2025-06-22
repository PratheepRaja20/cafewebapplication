package com.example.cms.controller;

import com.example.cms.model.User;
import com.example.cms.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController 
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminUserController {
    private final UserService userService;

    public AdminUserController(UserService userService) {
        this.userService = userService;  
    }

    @GetMapping("/all")
    public List<User> getAllUsers() { 
        return userService.getAllUsers();
    }

    @PutMapping("/{id}") //id vachi upade panrom
    public User updateUser(@PathVariable Long id, @RequestBody User user) { 
        return userService.updateUser(id, user); 
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
    
    @GetMapping("/count")
    public long getUserCount() {
        return userService.countNonAdminUsers();
    }


}

