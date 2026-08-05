package com.rajan.resumeanalyzer.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class RegisterResponse {

    private Long id;
    private String fullName;
    private String email;
    private String message;
}