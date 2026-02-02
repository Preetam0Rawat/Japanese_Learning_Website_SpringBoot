package com.preetam.japanese_learning_backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "vocabularies") // change if your collection name differs
public class Vocabulary {

    @Id
    private String id;

    private String word;
    private String meaning;
    private String furigana;
    private String romaji;

    // wrapper type (Mongo-safe)
    private Integer jlpt;

    // ===== Getters only =====

    public String getId() {
        return id;
    }

    public String getWord() {
        return word;
    }

    public String getMeaning() {
        return meaning;
    }

    public String getFurigana() {
        return furigana;
    }

    public String getRomaji() {
        return romaji;
    }

    public Integer getJlpt() {
        return jlpt;
    }
}
