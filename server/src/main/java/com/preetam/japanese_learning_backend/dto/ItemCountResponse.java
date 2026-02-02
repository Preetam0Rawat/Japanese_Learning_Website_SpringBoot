package com.preetam.japanese_learning_backend.dto;

public record ItemCountResponse(
        long totalKanji,
        long totalVocab,
        long learnedKanji,
        long learnedVocab
) {}