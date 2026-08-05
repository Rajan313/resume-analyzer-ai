package com.rajan.resumeanalyzer.controller;

import com.rajan.resumeanalyzer.dto.RegisterRequest;
import com.rajan.resumeanalyzer.dto.RegisterResponse;
import com.rajan.resumeanalyzer.dto.resume.ResumeUploadResponse;
import com.rajan.resumeanalyzer.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.rajan.resumeanalyzer.dto.LoginRequest;
import com.rajan.resumeanalyzer.dto.LoginResponse;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(
            @Valid @RequestBody RegisterRequest request) {

        RegisterResponse response = authService.register(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest request) {

        System.out.println("LOGIN API HIT");

        LoginResponse response = authService.login(request);

        return ResponseEntity.ok(response);
    }
}