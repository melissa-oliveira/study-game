package com.ufpr.studygame.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ufpr.studygame.repository.UserRepository;
import com.ufpr.studygame.entity.User;

@Service
@Transactional
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	public List<User> findAll() {		
		return userRepository.findAll();
	}
	
	public User findById(Long id) {		
		return userRepository.findById(id).get();	
	}
	
	public User findByEmail(String email) {		
		return userRepository.findByEmail(email);	
	}

	public User create(User entity) {		
		return userRepository.save(entity);
	}
	
	public User update(User entity) {
		User existingUser = userRepository.findById(entity.getId()).get();
		
		existingUser.setName(entity.getName());
		existingUser.setPassword(entity.getPassword());
		existingUser.setEmail(entity.getEmail());
		existingUser.setPhone(entity.getPhone());
		
		User updatedUser = userRepository.save(existingUser);
		return updatedUser;
	}
	
	public User login(String login, String password) {
	    User usuario = userRepository.findByEmail(login);

	    if (usuario != null && usuario.getPassword().equals(password)) {
	        return usuario;
	    } else {
	        return null;
	    }
	}
	
	public void delete(Long id) {
		userRepository.deleteById(id);
	}

	public String hashSHA256(String password) {
		// TODO Auto-generated method stub
		return null;
	}
}
