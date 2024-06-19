package com.ufpr.studygame.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ufpr.studygame.entity.User;
import com.ufpr.studygame.entity.UserPoints;

public interface UserPointsRepository extends JpaRepository<UserPoints, Long>{
	
	public UserPoints findByUser(User user);
}
