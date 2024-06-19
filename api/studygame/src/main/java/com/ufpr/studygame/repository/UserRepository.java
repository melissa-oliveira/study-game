package com.ufpr.studygame.repository;

import com.ufpr.studygame.entity.User;

import org.springframework.data.jpa.repository.*;

import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
	
	public User findByEmail(String email);
}
