package com.preetam.japanese_learning_backend.exception;

public class InvalidProgressRequestException extends RuntimeException {
    public InvalidProgressRequestException(String message) {
        super(message);
    }
}