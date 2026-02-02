package com.preetam.japanese_learning_backend.service;


import java.util.Collections;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.preetam.japanese_learning_backend.model.Student;
import com.preetam.japanese_learning_backend.repository.StudentRepository;

@Service
public class StudentUserDetailsService implements UserDetailsService {

    private final StudentRepository studentRepository;

    public StudentUserDetailsService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {

        // username = email
        Student student = studentRepository.findByEmail(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found: " + username)
                );

        return User.builder()
                .username(student.getEmail())
                .password(student.getPassword()) // hashed password
                .authorities(Collections.emptyList())
                .build();
    }
}
