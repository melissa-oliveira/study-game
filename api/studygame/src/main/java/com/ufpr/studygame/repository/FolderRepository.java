package com.ufpr.studygame.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ufpr.studygame.entity.Folder;
import com.ufpr.studygame.entity.User;

@Repository
public interface FolderRepository extends JpaRepository<Folder, Long>{

	public List<Folder> findByUser(User user);
}
