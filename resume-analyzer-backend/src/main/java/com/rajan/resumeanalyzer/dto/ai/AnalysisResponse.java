package com.rajan.resumeanalyzer.dto.ai;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnalysisResponse {

    private Integer matchScore;

    private List<String> strengths;

    private List<String> missingSkills;

    private List<String> suggestions;

    private String rawResponse;
}