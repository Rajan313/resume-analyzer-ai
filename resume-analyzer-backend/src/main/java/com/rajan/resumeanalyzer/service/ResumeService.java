package com.rajan.resumeanalyzer.service;

import com.rajan.resumeanalyzer.dto.resume.ResumeUploadResponse;
import org.springframework.web.multipart.MultipartFile;

public interface ResumeService {

    ResumeUploadResponse uploadResume(MultipartFile file, String email);

}