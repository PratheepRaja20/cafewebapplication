package com.example.cms.controller;

import com.example.cms.model.MenuItem;
import com.example.cms.service.MenuItemService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173") 
public class UserMenuController {

    private final MenuItemService menuItemService;

    public UserMenuController(MenuItemService menuItemService) {
        this.menuItemService = menuItemService;
    }

    @GetMapping("/menu/all")
    public List<MenuItem> getAllItems() {
        return menuItemService.getAllItems(); 
    }
}
