package com.preetam.japanese_learning_backend.dto;

public record JwtTokenRequest(
	    String username,
	    String password
	) {}