package com.preetam.japanese_learning_backend.dto;

import java.util.List;

import com.preetam.japanese_learning_backend.model.Kanji;

public record KanjiPageResponse(
        long total,
        int totalPages,
        int currentPage,
        List<Kanji> kanjis
) {}