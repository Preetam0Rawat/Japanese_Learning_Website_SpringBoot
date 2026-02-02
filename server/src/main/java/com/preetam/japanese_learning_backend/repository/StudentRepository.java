package com.preetam.japanese_learning_backend.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.preetam.japanese_learning_backend.model.Student;

public interface StudentRepository
extends MongoRepository<Student, String> {

Optional<Student> findByEmail(String email);
}
