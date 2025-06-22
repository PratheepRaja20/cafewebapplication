package com.example.cms.controller;

import com.example.cms.model.MenuItem;
import com.example.cms.service.MenuItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminMenuController {

    @Autowired
    private MenuItemService service;

    @GetMapping
    public List<MenuItem> getAll() {
        return service.getAllItems();
    }

   
    @PostMapping
                          
    public MenuItem create(@RequestParam("name") String name,
                           @RequestParam("category") String category,
                           @RequestParam("price") String price,
                           @RequestParam("image") MultipartFile image) {
        MenuItem item = new MenuItem(); 
        item.setName(name);
        item.setCategory(category);
        item.setPrice(Double.parseDouble(price)); 
        return service.save(item, image);
    }

    // Update (with optional image)
    @PutMapping("/{id}")
    public MenuItem update(@PathVariable Long id, 
                           @RequestParam("name") String name, 
                           @RequestParam("category") String category,
                           @RequestParam("price") String price,
                           @RequestParam(value = "image", required = false) MultipartFile image) {//img optional  
        MenuItem item = new MenuItem();
        item.setName(name);
        item.setCategory(category);
        item.setPrice(Double.parseDouble(price));
        return service.update(id, item, image);//snd service layer
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @GetMapping("/count")
    public long getMenuCount() {
        return service.getMenuCount();
    }
}
