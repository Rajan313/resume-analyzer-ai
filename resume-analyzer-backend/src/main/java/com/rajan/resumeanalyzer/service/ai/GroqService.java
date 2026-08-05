package com.rajan.resumeanalyzer.service.ai;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.rajan.resumeanalyzer.dto.ai.AnalysisResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class GroqService implements AiService {

    @Value("${groq.api.url}")
    private String apiUrl;

    @Value("${groq.api.key}")
    private String apiKey;

    @Value("${groq.model}")
    private String model;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public AnalysisResponse analyzeResume(String resumeText,
                                          String jobDescription) {

        try {

            String prompt = buildPrompt(resumeText, jobDescription);

            String requestBody = objectMapper.writeValueAsString(
                    Map.of(
                            "model", model,
                            "messages", List.of(
                                    Map.of(
                                            "role", "user",
                                            "content", prompt
                                    )
                            ),
                            "temperature", 0.2
                    )
            );

            RestClient restClient = RestClient.create();

            String response = restClient.post()
                    .uri(apiUrl)
                    .header("Content-Type", "application/json")
                    .header("Authorization", "Bearer " + apiKey)
                    .body(requestBody)
                    .retrieve()
                    .body(String.class);

            JsonNode root = objectMapper.readTree(response);

            String aiText = root
                    .path("choices")
                    .get(0)
                    .path("message")
                    .path("content")
                    .asText();

            AnalysisResponse response2 =
                    objectMapper.readValue(aiText, AnalysisResponse.class);

            response2.setRawResponse(aiText);

            return response2;

        } catch (Exception e) {

            throw new RuntimeException("Gemini API Error", e);
        }
    }

    private String buildPrompt(String resume,
                               String jd) {

        return """
You are an expert ATS Resume Analyzer.

Compare the resume with the job description.

Return ONLY valid JSON.

Do not use markdown.
                
                Do not use ```json.
                
                Do not add explanations.
                
                Output must start with { and end with }.

Example:

{
  "matchScore":90,
  "strengths":["Java","Spring Boot"],
  "missingSkills":["Docker"],
  "suggestions":["Add Docker project"]
}

Resume:
%s

Job Description:
%s
""".formatted(resume, jd);

    }
}