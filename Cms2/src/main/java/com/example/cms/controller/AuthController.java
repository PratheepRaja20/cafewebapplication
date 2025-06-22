package com.example.cms.controller;


import com.example.cms.dto.LoginDTO;
import com.example.cms.dto.UserDTO;
import com.example.cms.model.User;
import com.example.cms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173") 
@RestController 
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired  
    private UserService userService;

    @PostMapping("/register")
    public String register(@RequestBody UserDTO userDTO) {  
        return userService.registerUser(userDTO);// register succes or not 
    }

    @PostMapping("/login")
    public Object login(@RequestBody LoginDTO loginDTO) { //login dto  username pw irukum
        User user = userService.loginUser(loginDTO);
        if (user != null) {
            return user;//null illana login success
        }
        return "Invalid username or password";
    }
}
