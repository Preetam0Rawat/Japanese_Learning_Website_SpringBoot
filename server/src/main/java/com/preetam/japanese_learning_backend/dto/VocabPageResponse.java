package com.preetam.japanese_learning_backend.dto;

import java.util.List;

import com.preetam.japanese_learning_backend.model.Vocabulary;

public record VocabPageResponse(
        long total,
        int totalPages,
        int currentPage,
        List<Vocabulary> vocabs
) {}