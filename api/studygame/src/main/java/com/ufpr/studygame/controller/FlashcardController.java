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

import com.ufpr.studygame.entity.Flashcard;
import com.ufpr.studygame.entity.Quiz;
import com.ufpr.studygame.service.FlashcardService;

@CrossOrigin
@RestController
public class FlashcardController {

	@Autowired
    private FlashcardService flashcardService;

    @PostMapping("/flashcard")
    public Flashcard create(@RequestBody Flashcard flashcard) {
        return flashcardService.create(flashcard);
    }

    @GetMapping("/flashcard")
    public List<Flashcard> findAll() {
        return flashcardService.findAll();
    }

    @GetMapping("/flashcard/{id}")
    public Flashcard findById(@PathVariable("id") Long id) {
        return flashcardService.findById(id);
    }
    
    @GetMapping("/flashcard/folder/{id}")
    public List<Flashcard> findByQuiz(@PathVariable("id") Long id) {
        return flashcardService.findByFolderId(id);
    }

    @PutMapping("/flashcard")
    public Flashcard update(@RequestBody Flashcard flashcard) {
        return flashcardService.update(flashcard);
    }

    @DeleteMapping("/flashcard/{id}")
    public void deleteById(@PathVariable("id") Long id) {
        flashcardService.delete(id);
    }
}
