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

import com.ufpr.studygame.entity.UserPoints;
import com.ufpr.studygame.service.UserPointsService;

@CrossOrigin
@RestController
public class UserPointsController {

	@Autowired
	private UserPointsService userPointsService;
	
	@PostMapping("/userPoints")
	public UserPoints insert(@RequestBody UserPoints userPoints) {
       return userPointsService.create(userPoints);
    }
	
	@GetMapping("/userPoints")
	public List<UserPoints> findAll() {
	    return userPointsService.findAll();
	}
	 
	@GetMapping("/userPoints/{id}")
	public UserPoints findById(@PathVariable("id") Long id) {
	    return userPointsService.findById(id);
	}
 
    @GetMapping("/userPoints/user/{id}")
    public UserPoints findByUser(@PathVariable("id") Long id) {
        return userPointsService.findByUserId(id);
    }
	  
	 @PutMapping("/userPoints")
	 public UserPoints update(@RequestBody UserPoints userPoints) {
	     return userPointsService.update(userPoints);
	 }
	
	 @DeleteMapping("/userPoints/{id}")
	 public void deleteById(@PathVariable("id") Long id) {
		 userPointsService.delete(id);
	 }
}
