package com.rajan.resumeanalyzer.dto.ai;

import lombok.Data;

@Data
public class AnalysisRequest {

    private Long resumeId;

    private String jobDescription;

}