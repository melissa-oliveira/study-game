package com.ufpr.studygame.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ufpr.studygame.entity.Folder;
import com.ufpr.studygame.service.FolderService;

@CrossOrigin
@RestController
public class FolderController {

    @Autowired
    private FolderService folderService;

    @PostMapping("/folder")
    public Folder create(@RequestBody Folder folder) {
        return folderService.create(folder);
    }

    @GetMapping("/folder")
    public List<Folder> findAll() {
        return folderService.findAll();
    }
    
    @GetMapping("/folder/user/{id}")
    public List<Folder> findByUser(@PathVariable("id") Long id) {
        return folderService.findByUserId(id);
    }

    @GetMapping("/folder/{id}")
    public Folder findById(@PathVariable("id") Long id) {
        return folderService.findById(id);
    }

    @PutMapping("/folder")
    public Folder update(@RequestBody Folder folder) {
        return folderService.update(folder);
    }

    @DeleteMapping("/folder/{id}")
    public void deleteById(@PathVariable("id") Long id) {
        folderService.delete(id);
    }
}
