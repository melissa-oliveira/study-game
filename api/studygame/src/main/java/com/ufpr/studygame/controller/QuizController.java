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

import com.ufpr.studygame.entity.Quiz;
import com.ufpr.studygame.entity.QuizOptions;
import com.ufpr.studygame.service.QuizService;

@CrossOrigin
@RestController
public class QuizController {

	@Autowired
	private QuizService quizService;
	
	@PostMapping("/quiz")
	public Quiz create(@RequestBody Quiz quiz) {
	    return quizService.create(quiz);
	}
	
	@GetMapping("/quiz")
	public List<Quiz> findAll() {
	    return quizService.findAll();
	}
	
	@GetMapping("/quiz/{id}")
	public Quiz findById(@PathVariable("id") Long id) {
	    return quizService.findById(id);
	}
	
    @GetMapping("/quiz/folder/{id}")
    public List<Quiz> findByQuiz(@PathVariable("id") Long id) {
        return quizService.findByFolderId(id);
    }
	
	@PutMapping("/quiz")
	public Quiz update(@RequestBody Quiz quiz) {
	    return quizService.update(quiz);
	}
	
	@DeleteMapping("/quiz/{id}")
	public void deleteById(@PathVariable("id") Long id) {
		quizService.delete(id);
	}
}
