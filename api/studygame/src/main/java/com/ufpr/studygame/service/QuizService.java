package com.ufpr.studygame.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ufpr.studygame.entity.Flashcard;
import com.ufpr.studygame.entity.Folder;
import com.ufpr.studygame.entity.Quiz;
import com.ufpr.studygame.repository.FolderRepository;
import com.ufpr.studygame.repository.QuizRepository;

@Service
@Transactional
public class QuizService {

	@Autowired
	private QuizRepository quizRepository;
	
	@Autowired
	private FolderRepository folderRepository;
	
	public List<Quiz> findAll() {
        return quizRepository.findAll();
    }

    public Quiz findById(Long id) {
        Optional<Quiz> quiz = quizRepository.findById(id);
        return quiz.orElse(null);
    }
    
    public List<Quiz> findByFolderId(Long id) {
    	Optional<Folder> folder = folderRepository.findById(id);
        
        if (folder.isPresent()) {
            return quizRepository.findByFolder(folder.get());
        } else {
            return null;
        }
    }

    public Quiz create(Quiz quiz) {
        return quizRepository.save(quiz);
    }

    public Quiz update(Quiz quiz) {
        Optional<Quiz> existingQuizOpt = quizRepository.findById(quiz.getId());

        if (existingQuizOpt.isPresent()) {
            Quiz existingQuiz = existingQuizOpt.get();
            existingQuiz.setQuestion(quiz.getQuestion());
            existingQuiz.setFolder(quiz.getFolder());

            return quizRepository.save(existingQuiz);
        } else {
            return null;
        }
    }

    public void delete(Long id) {
        quizRepository.deleteById(id);
    }
}
