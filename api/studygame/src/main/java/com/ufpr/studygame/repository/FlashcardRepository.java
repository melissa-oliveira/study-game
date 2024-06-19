package com.ufpr.studygame.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ufpr.studygame.entity.Flashcard;
import com.ufpr.studygame.entity.Folder;

@Repository
public interface FlashcardRepository extends JpaRepository<Flashcard, Long>{
	public List<Flashcard> findByFolder(Folder folder);
}
