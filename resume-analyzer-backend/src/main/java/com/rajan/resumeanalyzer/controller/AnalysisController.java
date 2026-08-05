package com.rajan.resumeanalyzer.controller;

import com.rajan.resumeanalyzer.dto.ai.AnalysisHistoryResponse;
import com.rajan.resumeanalyzer.dto.ai.AnalysisRequest;
import com.rajan.resumeanalyzer.dto.ai.AnalysisResponse;
import com.rajan.resumeanalyzer.entity.Resume;
import com.rajan.resumeanalyzer.repository.ResumeRepository;
import com.rajan.resumeanalyzer.service.ai.AiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import jakarta.annotation.PostConstruct;
import com.rajan.resumeanalyzer.entity.Analysis;
import com.rajan.resumeanalyzer.repository.AnalysisRepository;

import java.util.List;

@RestController
@RequestMapping("/api/analysis")
@RequiredArgsConstructor
public class AnalysisController {

    private final ResumeRepository resumeRepository;

    private final AiService aiService;

    private final AnalysisRepository analysisRepository;

    @GetMapping("/history")
    public List<AnalysisHistoryResponse> history() {

        return analysisRepository.findAll()
                .stream()
                .map(a -> AnalysisHistoryResponse.builder()
                        .id(a.getId())
                        .resumeName(a.getResume().getFileName())
                        .matchScore(a.getMatchScore())
                        .createdAt(a.getCreatedAt())
                        .build())
                .toList();
    }

    @PostMapping
    public AnalysisResponse analyze(
            @RequestBody AnalysisRequest request) {

        Resume resume = resumeRepository.findById(request.getResumeId())
                .orElseThrow(() -> new RuntimeException("Resume not found."));

        AnalysisResponse response = aiService.analyzeResume(
                resume.getExtractedText(),
                request.getJobDescription()
        );

        Analysis analysis = Analysis.builder()
                .resume(resume)
                .jobDescription(request.getJobDescription())
                .matchScore(response.getMatchScore())
                .strengths(String.join(", ", response.getStrengths()))
                .missingSkills(String.join(", ", response.getMissingSkills()))
                .suggestions(String.join(", ", response.getSuggestions()))
                .build();

        analysisRepository.save(analysis);

        return response;
    }

    @PostConstruct
    public void init() {
        System.out.println("✅ AnalysisController Loaded");
    }

}