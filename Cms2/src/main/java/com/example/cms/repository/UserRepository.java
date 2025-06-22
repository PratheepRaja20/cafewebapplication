package com.example.cms.repository; //db layer nu solrom


import com.example.cms.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Long countByRoleNot(String role);

}

