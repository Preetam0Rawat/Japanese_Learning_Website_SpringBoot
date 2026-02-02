package com.preetam.japanese_learning_backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.preetam.japanese_learning_backend.model.Kanji;

public interface KanjiRepository extends MongoRepository<Kanji, String> {

    Page<Kanji> findByJlpt(Integer jlpt, Pageable pageable);

}
