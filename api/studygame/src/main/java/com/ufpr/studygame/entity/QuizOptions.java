package com.ufpr.studygame.entity;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_quiz_options")
public class QuizOptions implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;
	 
	@Column(name = "description", nullable = false)
    private String description;
	
	@Column(name = "correct_answer", nullable = false)
    private Boolean correctAnswer;
     
    @ManyToOne
    @JoinColumn(name = "quiz_id", nullable = false)
    private Quiz quiz;   
    
    public QuizOptions() {
    }
    
    // Getters and Setters
  
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Quiz getQuiz() {
		return quiz;
	}

	public void setQuiz(Quiz quiz) {
		this.quiz = quiz;
	}

	public Boolean getCorrectAnswer() {
		return correctAnswer;
	}

	public void setCorrectAnswer(Boolean correctAnswer) {
		this.correctAnswer = correctAnswer;
	}
}
