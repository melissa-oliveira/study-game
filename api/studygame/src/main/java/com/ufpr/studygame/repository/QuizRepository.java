package com.ufpr.studygame.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ufpr.studygame.entity.Folder;
import com.ufpr.studygame.entity.Quiz;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long>{
	public List<Quiz> findByFolder(Folder folder);
}
