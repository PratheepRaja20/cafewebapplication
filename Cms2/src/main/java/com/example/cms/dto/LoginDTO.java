package com.example.cms.dto;
// data transfer object
//store data and pass data over layers
//pojo class
public class LoginDTO {
    private String username;
    private String password;

    public String getUsername() { return username; }

    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }

    public void setPassword(String password) { this.password = password; }
}

