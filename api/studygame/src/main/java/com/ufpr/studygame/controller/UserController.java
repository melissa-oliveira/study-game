package com.ufpr.studygame.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ufpr.studygame.entity.Login;
import com.ufpr.studygame.entity.User;
import com.ufpr.studygame.service.UserService;

@CrossOrigin
@RestController
public class UserController {

	@Autowired
	private UserService userService;
	
	@PostMapping("/user")
	public User insert(@RequestBody User user) {
	    user.setPassword(user.getPassword());
	    userService.create(user);
	    return userService.findByEmail(user.getEmail());
	    }
	
	@GetMapping("/user")
	public List<User> findAll() {
	    return userService.findAll();
	}
	 
	 @GetMapping("/user/{id}")
	 public User findById(@PathVariable("id") Long id) {
	     return userService.findById(id);
	 }
	  
	 @PutMapping("/user")
	 public User update(@RequestBody User user) {
		 user.setPassword(user.getPassword());
	     return userService.update(user);
	 }
	
	 @DeleteMapping("/user/{id}")
	 public void deleteById(@PathVariable("id") Long id) {
	     userService.delete(id);
	 }
	 
	 @PostMapping("/login")
     public ResponseEntity<?> login(@RequestBody Login login) {
        User user = userService.findByEmail(login.getEmail());
        if (user != null && user.getPassword().equals(login.getPassword())) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        }
    }
}
