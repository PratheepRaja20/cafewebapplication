package com.example.cms.service;

import com.example.cms.dto.LoginDTO; 
import com.example.cms.dto.UserDTO;
import com.example.cms.model.User; 
import com.example.cms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service 
public class UserServiceImplementation implements UserService {

    @Autowired
    private UserRepository userRepo;

    
    //register user
    @Override
    public String registerUser(UserDTO userDTO) {  
        Optional<User> existing = userRepo.findByUsername(userDTO.getUsername()); 
        if (existing.isPresent()) {
            return "Username already exists";
        }

        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());
        user.setPhone(userDTO.getPhone());
        user.setRole("USER");

        userRepo.save(user);
        return "User registered successfully";
    }

    
    
    //login user
    @Override
    public User loginUser(LoginDTO loginDTO) { 
        Optional<User> user = userRepo.findByUsername(loginDTO.getUsername());
        if (user.isPresent() && user.get().getPassword().equals(loginDTO.getPassword())) { 
            return user.get(); 
        }
        return null;//failed
    }
    
    
    //get all user
    @Override
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    @Override
    public User createUser(User user) {
        return userRepo.save(user);
    }
    
    @Override
    public Optional<User> getUserById(Long id) {
        return userRepo.findById(id);
    }
    
    
    //update user
    @Override
    public User updateUser(Long id, User updatedUser) {//id vachi user ah update panrom user la dha ellam irukum id name pw 
        return userRepo.findById(id).map(user -> { 
            user.setUsername(updatedUser.getUsername());
            user.setEmail(updatedUser.getEmail());
            user.setPhone(updatedUser.getPhone());
            if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
                user.setPassword(updatedUser.getPassword());
            }
            return userRepo.save(user);
        }).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public void deleteUser(Long id) {
        userRepo.deleteById(id);
    }
    
    @Override
    public Long countNonAdminUsers() {
        return userRepo.countByRoleNot("ADMIN");
    }

}


