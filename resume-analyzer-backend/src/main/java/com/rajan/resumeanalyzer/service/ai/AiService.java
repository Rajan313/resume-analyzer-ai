package com.rajan.resumeanalyzer.service.ai;

import com.rajan.resumeanalyzer.dto.ai.AnalysisResponse;

public interface AiService {

    AnalysisResponse analyzeResume(
            String resumeText,
            String jobDescription
    );

}