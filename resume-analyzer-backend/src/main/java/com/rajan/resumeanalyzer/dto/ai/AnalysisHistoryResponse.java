package com.rajan.resumeanalyzer.dto.ai;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AnalysisHistoryResponse {

    private Long id;

    private String resumeName;

    private Integer matchScore;

    private LocalDateTime createdAt;

}