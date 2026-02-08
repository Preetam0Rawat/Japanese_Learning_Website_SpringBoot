package com.preetam.japanese_learning_backend.exception;

public class InvalidJlptLevelException extends RuntimeException {
    public InvalidJlptLevelException(String message) {
        super(message);
    }
}