package com.rajan.resumeanalyzer.service;

import com.rajan.resumeanalyzer.dto.LoginRequest;
import com.rajan.resumeanalyzer.dto.LoginResponse;
import com.rajan.resumeanalyzer.dto.RegisterRequest;
import com.rajan.resumeanalyzer.dto.RegisterResponse;

public interface AuthService {

    RegisterResponse register(RegisterRequest request);

    LoginResponse login(LoginRequest request);

}