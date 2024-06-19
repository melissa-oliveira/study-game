package com.ufpr.studygame.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ufpr.studygame.entity.User;
import com.ufpr.studygame.entity.UserPoints;
import com.ufpr.studygame.repository.UserPointsRepository;
import com.ufpr.studygame.repository.UserRepository;

@Service
@Transactional
public class UserPointsService {

	@Autowired
	private UserPointsRepository userPointsRepository;
	
	@Autowired
	private UserRepository userRepository;
	
    public List<UserPoints> findAll() {
        return userPointsRepository.findAll();
    }

    public UserPoints findById(Long id) {
        Optional<UserPoints> folder = userPointsRepository.findById(id);
        return folder.orElse(null);
    }
    
    public UserPoints findByUserId(Long id) {
    	Optional<User> user = userRepository.findById(id);
        
        if (user.isPresent()) {
            return userPointsRepository.findByUser(user.get());
        } else {
            return null;
        }
    }

    public UserPoints create(UserPoints userPoints) {
        return userPointsRepository.save(userPoints);
    }

    public UserPoints update(UserPoints userPoints) {
        Optional<UserPoints> existingUserPointsOpt = userPointsRepository.findById(userPoints.getId());

        if (existingUserPointsOpt.isPresent()) {
            UserPoints existingUserPoints = existingUserPointsOpt.get();
            existingUserPoints.setUser(userPoints.getUser());
            existingUserPoints.setWrongQnt(userPoints.getWrongQnt());
            existingUserPoints.setEasyQnt(userPoints.getEasyQnt());
            existingUserPoints.setHardQnt(userPoints.getHardQnt());
            existingUserPoints.setGuessQnt(userPoints.getGuessQnt());
            return userPointsRepository.save(existingUserPoints);
        } else {
            return null;
        }
    }

    public void delete(Long id) {
    	userPointsRepository.deleteById(id);
    }
}
