package com.ufpr.studygame.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ufpr.studygame.entity.Quiz;
import com.ufpr.studygame.entity.QuizOptions;

@Repository
public interface QuizOptionsRepository extends JpaRepository<QuizOptions, Long>{
	public List<QuizOptions> findByQuiz(Quiz quiz);
}
