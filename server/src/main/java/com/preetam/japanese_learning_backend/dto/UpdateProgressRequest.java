package com.preetam.japanese_learning_backend.dto;

import com.preetam.japanese_learning_backend.model.Progress;

public record UpdateProgressRequest(
        String kanjiId,
        String vocabularyId,
        Progress.Status status
) {}