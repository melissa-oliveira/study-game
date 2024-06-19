package com.ufpr.studygame.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ufpr.studygame.entity.Flashcard;
import com.ufpr.studygame.entity.Folder;
import com.ufpr.studygame.entity.User;
import com.ufpr.studygame.repository.FlashcardRepository;
import com.ufpr.studygame.repository.FolderRepository;

@Service
@Transactional
public class FlashcardService {
	
	@Autowired
	private FlashcardRepository flashcardRepository;
	
	@Autowired
	private FolderRepository folderRepository;
	
    public List<Flashcard> findAll() {
        return flashcardRepository.findAll();
    }

    public Flashcard findById(Long id) {
        Optional<Flashcard> flashcard = flashcardRepository.findById(id);
        return flashcard.orElse(null);
    }
    
    public List<Flashcard> findByFolderId(Long id) {
    	Optional<Folder> folder = folderRepository.findById(id);
        
        if (folder.isPresent()) {
            return flashcardRepository.findByFolder(folder.get());
        } else {
            return null;
        }
    }

    public Flashcard create(Flashcard flashcard) {
        return flashcardRepository.save(flashcard);
    }

    public Flashcard update(Flashcard flashcard) {
        Optional<Flashcard> existingFlashcardOpt = flashcardRepository.findById(flashcard.getId());

        if (existingFlashcardOpt.isPresent()) {
            Flashcard existingFlashcard = existingFlashcardOpt.get();
            existingFlashcard.setFront(flashcard.getFront());
            existingFlashcard.setBack(flashcard.getBack());
            existingFlashcard.setFolder(flashcard.getFolder());

            return flashcardRepository.save(existingFlashcard);
        } else {
            return null;
        }
    }

    public void delete(Long id) {
        flashcardRepository.deleteById(id);
    }
}
