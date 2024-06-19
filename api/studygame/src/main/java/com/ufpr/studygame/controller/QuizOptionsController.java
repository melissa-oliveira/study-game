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

import com.ufpr.studygame.entity.Folder;
import com.ufpr.studygame.entity.QuizOptions;
import com.ufpr.studygame.service.QuizOptionsService;

@CrossOrigin
@RestController
public class QuizOptionsController {

	@Autowired
    private QuizOptionsService quizOptionsService;

    @PostMapping("/quizOptions")
    public QuizOptions create(@RequestBody QuizOptions quizOptions) {
        return quizOptionsService.create(quizOptions);
    }

    @GetMapping("/quizOptions")
    public List<QuizOptions> findAll() {
        return quizOptionsService.findAll();
    }

    @GetMapping("/quizOptions/{id}")
    public QuizOptions findById(@PathVariable("id") Long id) {
        return quizOptionsService.findById(id);
    }
    
    @GetMapping("/quizOptions/quiz/{id}")
    public List<QuizOptions> findByQuiz(@PathVariable("id") Long id) {
        return quizOptionsService.findByQuizId(id);
    }

    @PutMapping("/quizOptions")
    public QuizOptions update(@RequestBody QuizOptions quizOptions) {
        return quizOptionsService.update(quizOptions);
    }

    @DeleteMapping("/quizOptions/{id}")
    public void deleteById(@PathVariable("id") Long id) {
        quizOptionsService.delete(id);
    }
}
