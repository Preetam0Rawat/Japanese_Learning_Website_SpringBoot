package com.preetam.japanese_learning_backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import com.preetam.japanese_learning_backend.dto.ItemCountResponse;
import com.preetam.japanese_learning_backend.dto.KanjiPageResponse;
import com.preetam.japanese_learning_backend.dto.UpdateProgressRequest;
import com.preetam.japanese_learning_backend.dto.VocabPageResponse;
import com.preetam.japanese_learning_backend.exception.InvalidJlptLevelException;
import com.preetam.japanese_learning_backend.exception.InvalidProgressRequestException;
import com.preetam.japanese_learning_backend.exception.ResourceNotFoundException;
import com.preetam.japanese_learning_backend.model.Kanji;
import com.preetam.japanese_learning_backend.model.Progress;
import com.preetam.japanese_learning_backend.model.Student;
import com.preetam.japanese_learning_backend.model.Vocabulary;
import com.preetam.japanese_learning_backend.repository.KanjiRepository;
import com.preetam.japanese_learning_backend.repository.ProgressRepository;
import com.preetam.japanese_learning_backend.repository.StudentRepository;
import com.preetam.japanese_learning_backend.repository.VocabularyRepository;

@Service
public class LearningService {

	private final KanjiRepository kanjiRepository;
	private final VocabularyRepository vocabularyRepository;
	private final ProgressRepository progressRepository;
	private final StudentRepository studentRepository;

	public LearningService(KanjiRepository kanjiRepository, VocabularyRepository vocabularyRepository,
			ProgressRepository progressRepository, StudentRepository studentRepository) {
		this.kanjiRepository = kanjiRepository;
		this.vocabularyRepository = vocabularyRepository;
		this.progressRepository = progressRepository;
		this.studentRepository = studentRepository;
	}
	
	

	public List<Kanji> getAllKanji() {
		return kanjiRepository.findAll();
	}
	
	

	public KanjiPageResponse getKanjiByJlptLevel(int level, int page, int limit) {
		if (level < 1 || level > 5) {
			throw new InvalidJlptLevelException("Invalid JLPT level");
		}

		// Spring pages are 0-based
		Pageable pageable = PageRequest.of(page - 1, limit);

		Page<Kanji> kanjiPage = kanjiRepository.findByJlpt(level, pageable);

		if (kanjiPage.isEmpty()) {
		    throw new ResourceNotFoundException("No kanji found for this JLPT level");
		}


		return new KanjiPageResponse(kanjiPage.getTotalElements(), kanjiPage.getTotalPages(), page,
				kanjiPage.getContent());
	}
	
	
	

	public Kanji getKanjiById(String id) {

		return kanjiRepository.findById(id).orElseThrow(() ->  new ResourceNotFoundException("Kanji not found with id: " + id));
	}
	
	

	public List<Vocabulary> getAllVocabs() {
		return vocabularyRepository.findAll();
	}
	
	

	public VocabPageResponse getVocabByJlptLevel(int level, int page, int limit) {

		// ✅ Validation (same as Node)
		if (level < 1 || level > 5) {
			throw new InvalidJlptLevelException("Invalid JLPT level");
		}

		// Spring pages are 0-based
		Pageable pageable = PageRequest.of(page - 1, limit);

		Page<Vocabulary> vocabPage = vocabularyRepository.findByJlpt(level, pageable);

		if (vocabPage.isEmpty()) {
		    throw new ResourceNotFoundException("No kanji found for this JLPT level");
		}

		return new VocabPageResponse(vocabPage.getTotalElements(), vocabPage.getTotalPages(), page,
				vocabPage.getContent());
	}

	
	
	public Progress getProgressStatus(String kanjiId, String vocabularyId, Authentication authentication) {

		// 1️⃣ JWT → email
		String email = authentication.getName();

		// 2️⃣ email → student
		Student student = studentRepository.findByEmail(email)
				.orElseThrow(() ->   new ResourceNotFoundException("Student not found with email: " + email));

		String studentId = student.getId();

		if (kanjiId != null) {
			return progressRepository.findByStudentIdAndKanjiId(studentId, kanjiId).orElse(null); // ✅ return null
		}

		if (vocabularyId != null) {
			return progressRepository.findByStudentIdAndVocabularyId(studentId, vocabularyId).orElse(null); // ✅ return
																											// null
		}

		 throw new InvalidProgressRequestException(
		            "Provide either kanjiId OR vocabularyId"
		    );	
		 }

	
	
	public Progress updateProgressStatus(UpdateProgressRequest request, Authentication authentication) {

		String email = authentication.getName();
		Student student = studentRepository.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("Student not found with email: " + email));

		String studentId = student.getId();

		String kanjiId = request.kanjiId();
		String vocabularyId = request.vocabularyId();
		Progress.Status status = request.status();

// ===== validations =====
		if (status == null) {
		    throw new InvalidProgressRequestException("Status is required");
		}

		boolean both = kanjiId != null && vocabularyId != null;
		boolean none = kanjiId == null && vocabularyId == null;

		if (both || none) {
			 throw new InvalidProgressRequestException(
			            "Provide either kanjiId OR vocabularyId"
			    );	
		}

// ===== find existing =====
		Optional<Progress> optional;

		if (kanjiId != null) {
			optional = progressRepository.findByStudentIdAndKanjiId(studentId, kanjiId);
		} else {
			optional = progressRepository.findByStudentIdAndVocabularyId(studentId, vocabularyId);
		}

// ===== UPSERT =====

		if (optional.isPresent()) {
// update existing (BEST WAY)
			Progress existing = optional.get();
			existing.setStatus(status);
			return progressRepository.save(existing);
		}

// create new
		Progress newProgress = new Progress(studentId, kanjiId, vocabularyId, status);

		return progressRepository.save(newProgress);
	}

	
	
	
	
	public void removeProgressStatus(String kanjiId, String vocabularyId, Authentication authentication) {

		String email = authentication.getName();

		Student student = studentRepository.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("Student not found with email: " + email));

		String studentId = student.getId();

		if (kanjiId == null && vocabularyId == null) {
			throw new InvalidProgressRequestException("kanjiId or vocabularyId required");
		}

		Optional<Progress> optional;

		if (kanjiId != null) {
			optional = progressRepository.findByStudentIdAndKanjiId(studentId, kanjiId);
		} else {
			optional = progressRepository.findByStudentIdAndVocabularyId(studentId, vocabularyId);
		}

		Progress progress = optional
				.orElseThrow(() ->  new ResourceNotFoundException("Progress not found"));


		progressRepository.delete(progress);
	}
	
	
	public ItemCountResponse getItemCount(Authentication authentication) {

	    String email = authentication.getName();

	    Student student = studentRepository.findByEmail(email)
	            .orElseThrow(() ->
	            new ResourceNotFoundException("Student not found with email: " + email));


	    String studentId = student.getId();


	    long totalKanji = kanjiRepository.count();

	    long totalVocab = vocabularyRepository.count();

	    long learnedKanji =
	            progressRepository.countByStudentIdAndKanjiIdIsNotNullAndStatus(
	                    studentId, Progress.Status.Learned);

	    long learnedVocab =
	            progressRepository.countByStudentIdAndVocabularyIdIsNotNullAndStatus(
	                    studentId, Progress.Status.Learned);


	    return new ItemCountResponse(
	            totalKanji,
	            totalVocab,
	            learnedKanji,
	            learnedVocab
	    );
	}
	
	

}