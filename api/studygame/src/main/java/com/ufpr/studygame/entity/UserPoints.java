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
@Table(name = "tb_user_points")
public class UserPoints implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;
	 
	@Column(name = "wrong_qnt")
    private Long wrongQnt;
	
	@Column(name = "easy_qnt")
    private Long easyQnt;
	
	@Column(name = "hard_qnt")
    private Long hardQnt;
	
	@Column(name = "guess_qnt")
    private Long guessQnt;
	
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;   
    
    public UserPoints() {
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getWrongQnt() {
		return wrongQnt;
	}

	public void setWrongQnt(Long wrongQnt) {
		this.wrongQnt = wrongQnt;
	}

	public Long getEasyQnt() {
		return easyQnt;
	}

	public void setEasyQnt(Long easyQnt) {
		this.easyQnt = easyQnt;
	}

	public Long getHardQnt() {
		return hardQnt;
	}

	public void setHardQnt(Long hardQnt) {
		this.hardQnt = hardQnt;
	}

	public Long getGuessQnt() {
		return guessQnt;
	}

	public void setGuessQnt(Long guessQnt) {
		this.guessQnt = guessQnt;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
}
