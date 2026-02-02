package com.preetam.japanese_learning_backend.dto;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record SignupRequest(

    @NotBlank(message = "Name is required")
    String name,

    @NotBlank(message = "Email is required")
    @Email(message = "Email format is invalid")
    String email,

    @NotBlank(message = "Password is required")
    @Size(min = 3, message = "Password must be at least 3 characters")
    String password,
    
    @NotBlank(message = "Password is required")
    @Size(min = 3, message = "Password must be at least 3 characters")
    String confirmPassword

) {}