package com.rajan.resumeanalyzer.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.JWTVerifier;

import java.util.Date;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expiration;

    public String generateToken(String email) {

        Algorithm algorithm = Algorithm.HMAC256(secret);

        return JWT.create()
                .withSubject(email)
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + expiration))
                .sign(algorithm);
    }

    public String extractEmail(String token) {

        Algorithm algorithm = Algorithm.HMAC256(secret);

        return JWT.require(algorithm)
                .build()
                .verify(token)
                .getSubject();
    }

    public boolean validateToken(String token) {

        try {

            Algorithm algorithm = Algorithm.HMAC256(secret);

            JWT.require(algorithm)
                    .build()
                    .verify(token);

            return true;

        } catch (Exception e) {

            return false;
        }
    }

    public boolean isTokenValid(String token, String email) {

        try {

            String username = extractEmail(token);

            return username.equals(email);

        } catch (Exception e) {

            return false;

        }
    }
}