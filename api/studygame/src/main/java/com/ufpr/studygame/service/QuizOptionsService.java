package com.ufpr.studygame.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ufpr.studygame.entity.Flashcard;
import com.ufpr.studygame.entity.Folder;
import com.ufpr.studygame.entity.Quiz;
import com.ufpr.studygame.entity.QuizOptions;
import com.ufpr.studygame.repository.QuizOptionsRepository;
import com.ufpr.studygame.repository.QuizRepository;

@Service
@Transactional
public class QuizOptionsService {

	@Autowired
	private QuizOptionsRepository quizOptionsRepository;
	
	@Autowired
	private QuizRepository quizRepository;

    public List<QuizOptions> findAll() {
        return quizOptionsRepository.findAll();
    }

    public QuizOptions findById(Long id) {
        Optional<QuizOptions> quizOptions = quizOptionsRepository.findById(id);
        return quizOptions.orElse(null);
    }
    
    public List<QuizOptions> findByQuizId(Long id) {
    	Optional<Quiz> quiz = quizRepository.findById(id);
        
        if (quiz.isPresent()) {
            return quizOptionsRepository.findByQuiz(quiz.get());
        } else {
            return null;
        }
    }

    public QuizOptions create(QuizOptions quizOptions) {
        return quizOptionsRepository.save(quizOptions);
    }

    public QuizOptions update(QuizOptions quizOptions) {
        Optional<QuizOptions> existingQuizOptionsOpt = quizOptionsRepository.findById(quizOptions.getId());

        if (existingQuizOptionsOpt.isPresent()) {
            QuizOptions existingQuizOptions = existingQuizOptionsOpt.get();
            existingQuizOptions.setDescription(quizOptions.getDescription());
            existingQuizOptions.setCorrectAnswer(quizOptions.getCorrectAnswer());
            existingQuizOptions.setQuiz(quizOptions.getQuiz());

            return quizOptionsRepository.save(existingQuizOptions);
        } else {
            return null;
        }
    }

    public void delete(Long id) {
        quizOptionsRepository.deleteById(id);
    }
}
	