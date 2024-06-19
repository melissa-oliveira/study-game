package com.ufpr.studygame.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ufpr.studygame.entity.Folder;
import com.ufpr.studygame.entity.User;
import com.ufpr.studygame.repository.FolderRepository;
import com.ufpr.studygame.repository.UserRepository;

@Service
@Transactional
public class FolderService {

	@Autowired
	private FolderRepository folderRepository;
	
	@Autowired
	private UserRepository userRepository;

    public List<Folder> findAll() {
        return folderRepository.findAll();
    }

    public Folder findById(Long id) {
        Optional<Folder> folder = folderRepository.findById(id);
        return folder.orElse(null);
    }
    
    public List<Folder> findByUserId(Long id) {
    	Optional<User> user = userRepository.findById(id);
        
        if (user.isPresent()) {
            return folderRepository.findByUser(user.get());
        } else {
            return null;
        }
    }

    public Folder create(Folder folder) {
        return folderRepository.save(folder);
    }

    public Folder update(Folder folder) {
        Optional<Folder> existingFolderOpt = folderRepository.findById(folder.getId());

        if (existingFolderOpt.isPresent()) {
            Folder existingFolder = existingFolderOpt.get();
            existingFolder.setDescription(folder.getDescription());
            existingFolder.setUser(folder.getUser());

            return folderRepository.save(existingFolder);
        } else {
            return null;
        }
    }

    public void delete(Long id) {
        folderRepository.deleteById(id);
    }
}
