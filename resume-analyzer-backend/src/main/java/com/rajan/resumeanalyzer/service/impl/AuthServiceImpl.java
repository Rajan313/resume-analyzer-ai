package com.rajan.resumeanalyzer.service.impl;

import com.rajan.resumeanalyzer.dto.LoginRequest;
import com.rajan.resumeanalyzer.dto.LoginResponse;
import com.rajan.resumeanalyzer.dto.RegisterRequest;
import com.rajan.resumeanalyzer.dto.RegisterResponse;
import com.rajan.resumeanalyzer.entity.Role;
import com.rajan.resumeanalyzer.entity.User;
import com.rajan.resumeanalyzer.exception.EmailAlreadyExistsException;
import com.rajan.resumeanalyzer.repository.UserRepository;
import com.rajan.resumeanalyzer.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.rajan.resumeanalyzer.security.JwtService;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Override
    public RegisterResponse register(RegisterRequest request) {

        // Step 1: Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new EmailAlreadyExistsException("Email already registered.");
        }

        // Step 2: Create User entity
        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();

        // Step 3: Save to database
        User savedUser = userRepository.save(user);

        // Step 4: Return response
        return RegisterResponse.builder()
                .id(savedUser.getId())
                .fullName(savedUser.getFullName())
                .email(savedUser.getEmail())
                .message("User registered successfully.")
                .build();
    }

    @Override
    public LoginResponse login(LoginRequest request) {

        // Find user by email
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        // Verify password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        // Generate JWT
        String token = jwtService.generateToken(user.getEmail());

        // Return response
        return LoginResponse.builder()
                .token(token)
                .email(user.getEmail())
                .message("Login successful.")
                .build();
    }
}