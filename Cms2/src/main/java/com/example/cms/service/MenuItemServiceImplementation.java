package com.example.cms.service;

import com.example.cms.model.MenuItem;
import com.example.cms.repository.MenuItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.Optional;

@Service
public class MenuItemServiceImplementation implements MenuItemService {

    @Autowired
    private MenuItemRepository repo;

    private final String UPLOAD_DIR = "uploads";
 
    @Override
    public List<MenuItem> getAllItems() {
        return repo.findAll(); // Fetch all menu items from DB
    }

    @Override
    public MenuItem save(MenuItem item, MultipartFile imageFile) {
        try {
            if (imageFile != null && !imageFile.isEmpty()) {
                String fileName = imageFile.getOriginalFilename();
                Path imagePath = Paths.get(UPLOAD_DIR, fileName);
                Files.createDirectories(imagePath.getParent()); // Ensure folder exists
                Files.copy(imageFile.getInputStream(), imagePath, StandardCopyOption.REPLACE_EXISTING);//uploadds folder la copy panrom already iruntha overrite agum
                item.setImage(fileName); //Store just the filename in DB
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return repo.save(item); 
    }

    
    
    //menu update panna
    @Override
    public MenuItem update(Long id, MenuItem newItem, MultipartFile imageFile) { 
        Optional<MenuItem> optional = repo.findById(id);
        if (optional.isPresent()) {
            MenuItem existing = optional.get();//db la irunthu get panrom
            existing.setName(newItem.getName());
            existing.setCategory(newItem.getCategory());
            existing.setPrice(newItem.getPrice());

            try {
                if (imageFile != null && !imageFile.isEmpty()) { 
                    String fileName = imageFile.getOriginalFilename();
                    Path imagePath = Paths.get(UPLOAD_DIR, fileName);
                    Files.createDirectories(imagePath.getParent());
                    Files.copy(imageFile.getInputStream(), imagePath, StandardCopyOption.REPLACE_EXISTING);
                    existing.setImage(fileName);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }

            return repo.save(existing); //insert pannum 
        } else {
            throw new RuntimeException("Menu item not found with id: " + id); //no item found in db na error varum
        }
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id); // Delete item from DB
    }

    @Override
    public Long getMenuCount() {
        return repo.count(); // Count total items
    }
}
