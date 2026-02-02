package com.preetam.japanese_learning_backend.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.preetam.japanese_learning_backend.model.Vocabulary;


public interface VocabularyRepository extends MongoRepository<Vocabulary, String> {

    Page<Vocabulary> findByJlpt(int jlpt, Pageable pageable);
}