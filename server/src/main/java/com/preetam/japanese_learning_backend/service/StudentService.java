package com.preetam.japanese_learning_backend.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.preetam.japanese_learning_backend.dto.SignupRequest;
import com.preetam.japanese_learning_backend.dto.SignupResponse;
import com.preetam.japanese_learning_backend.model.Student;
import com.preetam.japanese_learning_backend.repository.StudentRepository;

@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;

    public StudentService(StudentRepository studentRepository,
                          PasswordEncoder passwordEncoder) {
        this.studentRepository = studentRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public SignupResponse signup(SignupRequest request) {

        // 1️⃣ Check if email already exists
        if (studentRepository.findByEmail(request.email()).isPresent()) {
            throw new IllegalArgumentException("Email already registered");
        }
        
        if (!request.password().equals(request.confirmPassword())) {
            throw new IllegalArgumentException("Passwords do not match");
        }

        // 2️⃣ Hash password
        String hashedPassword = passwordEncoder.encode(request.password());

        // 3️⃣ Create Student entity
        Student student = new Student(
                request.name(),
                request.email(),
                hashedPassword
        );

        // 4️⃣ Save to MongoDB
        Student savedStudent = studentRepository.save(student);

        // 5️⃣ Return response DTO (NO password)
        return new SignupResponse(
                savedStudent.getId(),
                savedStudent.getName(),
                savedStudent.getEmail()
        );
    }
}
