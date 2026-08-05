package com.rajan.resumeanalyzer.service.impl;

import com.rajan.resumeanalyzer.dto.resume.ResumeUploadResponse;
import com.rajan.resumeanalyzer.entity.Resume;
import com.rajan.resumeanalyzer.entity.User;
import com.rajan.resumeanalyzer.repository.ResumeRepository;
import com.rajan.resumeanalyzer.repository.UserRepository;
import com.rajan.resumeanalyzer.service.ResumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Value;
import com.rajan.resumeanalyzer.service.pdf.PdfService;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ResumeServiceImpl implements ResumeService {

    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;
    private final PdfService pdfService;


    @Value("${app.upload.dir}")
    private String uploadDir;


    @Override
    public ResumeUploadResponse uploadResume(MultipartFile file, String email) {

        try {

            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            File directory = new File(System.getProperty("user.dir")
                    + File.separator
                    + uploadDir);

            if (!directory.exists()) {
                boolean created = directory.mkdirs();

                if (!created) {
                    throw new RuntimeException("Could not create upload directory.");
                }
            }

            String originalFileName = file.getOriginalFilename();

            String storedFileName =
                    UUID.randomUUID() + "_" + originalFileName;

            String filePath =
                    System.getProperty("user.dir")
                            + File.separator
                            + uploadDir
                            + File.separator
                            + storedFileName;

            File savedFile = new File(filePath);
            file.transferTo(savedFile);
            String extractedText =
                    pdfService.extractText(savedFile);

            System.out.println("===== EXTRACTED TEXT =====");
            System.out.println(extractedText);
            System.out.println("==========================");

            Resume resume = Resume.builder()
                    .fileName(originalFileName)
                    .storedFileName(storedFileName)
                    .filePath(filePath)
                    .extractedText(extractedText)
                    .user(user)
                    .build();

            Resume savedResume = resumeRepository.save(resume);

            return ResumeUploadResponse.builder()
                    .resumeId(savedResume.getId())
                    .fileName(savedResume.getFileName())
                    .message("Resume uploaded successfully.")
                    .build();

        } catch (IOException e) {

            throw new RuntimeException("Failed to upload resume.", e);

        }
    }
}