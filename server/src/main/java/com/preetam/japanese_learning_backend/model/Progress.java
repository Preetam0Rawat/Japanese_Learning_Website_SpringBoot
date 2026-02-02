package com.preetam.japanese_learning_backend.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "progresses")
@CompoundIndexes({
        // same as your mongoose indexes
        @CompoundIndex(name = "kanji_status_idx", def = "{'kanjiId': 1, 'status': 1}"),
        @CompoundIndex(name = "vocab_status_idx", def = "{'vocabularyId': 1, 'status': 1}")
})
public class Progress {

    @Id
    private String id;

    private String studentId;
    private String kanjiId;
    private String vocabularyId;

    private Status status;

    // Required by Spring Data (reflection)
    protected Progress() {}

    // constructor
    public Progress(String studentId,
                    String kanjiId,
                    String vocabularyId,
                    Status status) {
        this.studentId = studentId;
        this.kanjiId = kanjiId;
        this.vocabularyId = vocabularyId;
        this.status = status;
    }

    // ===== getters only (immutable style) =====

    public String getId() {
        return id;
    }

    public String getStudentId() {
        return studentId;
    }

    public String getKanjiId() {
        return kanjiId;
    }

    public String getVocabularyId() {
        return vocabularyId;
    }

    public Status getStatus() {
        return status;
    }
    
    public void setStatus(Status status) {
        this.status = status;
    }

    // ===== enum instead of string =====

    public enum Status {
        Learning,
        Learned
    }
}
