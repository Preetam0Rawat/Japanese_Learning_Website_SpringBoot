package com.preetam.japanese_learning_backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.preetam.japanese_learning_backend.dto.BugReportRequest;
import com.preetam.japanese_learning_backend.dto.ItemCountResponse;
import com.preetam.japanese_learning_backend.dto.KanjiPageResponse;
import com.preetam.japanese_learning_backend.dto.UpdateProgressRequest;
import com.preetam.japanese_learning_backend.dto.VocabPageResponse;
import com.preetam.japanese_learning_backend.model.Kanji;
import com.preetam.japanese_learning_backend.model.Progress;
import com.preetam.japanese_learning_backend.model.Vocabulary;
import com.preetam.japanese_learning_backend.service.LearningService;

@RestController
@RequestMapping("/learn")
public class LearningController {

    private final LearningService learningService;

    public LearningController(LearningService learningService) {
        this.learningService = learningService;
    }

    @GetMapping("/kanjis")
    public List<Kanji> getAllKanji() {
        return learningService.getAllKanji();
    }
    

    @GetMapping("/kanjis/by-level")
    public KanjiPageResponse getKanjiByLevel(
            @RequestParam int level,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "25") int limit
    ) {
        return learningService.getKanjiByJlptLevel(level, page, limit);
    }
    
    @GetMapping("/kanjis/{id}")
    public Kanji getKanjiById(@PathVariable String id) {
        return learningService.getKanjiById(id);
    }
    

    @GetMapping("/vocabs")
    public List<Vocabulary> getAllVocabs() {
        return learningService.getAllVocabs();
    }

    @GetMapping("/vocabs/by-level")
    public VocabPageResponse getVocabByLevel(
            @RequestParam int level,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "6") int limit
    ) {
        return learningService.getVocabByJlptLevel(level, page, limit);
    }
    
    
    @GetMapping("/progressStatus")
    public Progress getProgressStatus(
            @RequestParam(required = false) String kanjiId,
            @RequestParam(required = false) String vocabularyId,
            Authentication authentication) {

        return learningService.getProgressStatus(kanjiId, vocabularyId, authentication);
    }
    
    @PostMapping("/updateStatus")
    public ResponseEntity<Progress> updateStatus(
            @RequestBody
            UpdateProgressRequest request,
            Authentication authentication) {

        return ResponseEntity.ok(
                learningService.updateProgressStatus(request, authentication)
        );
    }
    
    @DeleteMapping("/removeStatus")
    public ResponseEntity<String> removeProgress(
            @RequestParam(required = false) String kanjiId,
            @RequestParam(required = false) String vocabularyId,
            Authentication authentication) {

        learningService.removeProgressStatus(kanjiId, vocabularyId, authentication);

        return ResponseEntity.ok("Progress entry deleted successfully");
    }
    
    @PostMapping("/report")
    public ResponseEntity<BugReportRequest> reportBug(@RequestBody BugReportRequest request) {
        return ResponseEntity.ok(request);
    }
    
    
    @GetMapping("/item-count")
    public ResponseEntity<ItemCountResponse> getItemCount(Authentication authentication) {

        return ResponseEntity.ok(
                learningService.getItemCount(authentication)
        );
    }
    
    
}