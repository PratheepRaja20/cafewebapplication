package com.example.cms.service;


import java.util.List;
import java.util.Optional;

import com.example.cms.dto.LoginDTO;
import com.example.cms.dto.UserDTO;
import com.example.cms.model.User;

public interface UserService {
    String registerUser(UserDTO userDTO);
    User loginUser(LoginDTO loginDTO);
    List<User> getAllUsers();
    User createUser(User user);
    User updateUser(Long id, User updatedUser);
    Optional<User> getUserById(Long id);
    void deleteUser(Long id);
    Long countNonAdminUsers();

}
