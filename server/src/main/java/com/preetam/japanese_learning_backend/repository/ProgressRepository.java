package com.preetam.japanese_learning_backend.repository;


import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.preetam.japanese_learning_backend.model.Progress;

public interface ProgressRepository extends MongoRepository<Progress, String> {

    // single item status
    Optional<Progress> findByStudentIdAndKanjiId(String studentId, String kanjiId);
    Optional<Progress> findByStudentIdAndVocabularyId(String studentId, String vocabularyId);


    long countByStudentIdAndKanjiIdIsNotNullAndStatus(
            String studentId, Progress.Status status);

    long countByStudentIdAndVocabularyIdIsNotNullAndStatus(
            String studentId, Progress.Status status);
}
