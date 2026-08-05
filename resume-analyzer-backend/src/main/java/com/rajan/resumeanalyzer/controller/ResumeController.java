package com.rajan.resumeanalyzer.controller;

import com.rajan.resumeanalyzer.dto.resume.ResumeUploadResponse;
import com.rajan.resumeanalyzer.service.ResumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import jakarta.annotation.PostConstruct;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/api/resume")
@RequiredArgsConstructor
public class ResumeController {

    private final ResumeService resumeService;

    @PostMapping("/upload")
    public ResponseEntity<ResumeUploadResponse> uploadResume(

            @RequestParam("file") MultipartFile file,
            Authentication authentication

    ) {

        String email = authentication.getName();

        ResumeUploadResponse response =
                resumeService.uploadResume(file, email);

        return ResponseEntity.ok(response);
    }

    @PostConstruct
    public void init() {
        System.out.println("✅ ResumeController Loaded");
    }

}