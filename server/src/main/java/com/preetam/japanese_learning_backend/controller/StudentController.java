package com.preetam.japanese_learning_backend.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.preetam.japanese_learning_backend.dto.SignupRequest;
import com.preetam.japanese_learning_backend.dto.SignupResponse;
import com.preetam.japanese_learning_backend.service.StudentService;

import jakarta.validation.Valid;
@RestController
@RequestMapping("/student")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping("/signup")
    public SignupResponse signup(@Valid @RequestBody SignupRequest request) {
        return studentService.signup(request);
    }
}
