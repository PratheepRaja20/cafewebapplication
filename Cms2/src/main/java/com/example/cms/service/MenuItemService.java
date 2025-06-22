package com.example.cms.service;

import com.example.cms.model.MenuItem;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface MenuItemService {

    List<MenuItem> getAllItems();

    MenuItem save(MenuItem item, MultipartFile imageFile);  
    MenuItem update(Long id, MenuItem newItem, MultipartFile imageFile); 

    void delete(Long id);

    Long getMenuCount();
}
