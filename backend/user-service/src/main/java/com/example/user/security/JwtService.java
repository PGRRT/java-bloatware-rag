package com.example.user.security;

import com.example.common.dto.JwtUserClaims;
import com.example.user.domain.dto.auth.AccessRefreshToken;
import com.example.user.repository.UserRepository;
import com.example.user.service.CookieService;
import io.jsonwebtoken.*;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Slf4j
@Service
@Getter
@Setter
@RequiredArgsConstructor
public class JwtService extends com.example.common.security.JwtService {
    private final CookieService cookieService;
    private final UserRepository userRepository;

    @Value("${jwt.accessTokenExpirationMs}")
    private int jwtAccessTokenExpirationMs;

    @Value("${jwt.refreshTokenExpirationMs}")
    private int jwtRefreshTokenExpirationMs;

    public AccessRefreshToken createSessionCookies(
            UUID id,
            String email,
            String role) {
        JwtUserClaims jwtUserClaims = getJwtUserClaims(
                id,
                email,
                role
        );

        String accessToken = getAccessToken(jwtUserClaims);
        ResponseCookie refreshTokenCookie = getRefreshTokenCookie(jwtUserClaims);

        return AccessRefreshToken.builder().accessToken(accessToken).refreshToken(refreshTokenCookie).build();
    }

    public JwtUserClaims getJwtUserClaims(UUID id, String email, String role) {
        return JwtUserClaims.builder()
                .userId(id)
                .email(email)
                .role(role)
                .build();
    }

    private String generateToken(JwtUserClaims userClaims, int expirationMs) {
        return Jwts.builder()
                .subject(userClaims.userId().toString())
                .claim("email", userClaims.email())
                .claim("role", userClaims.role())
                .issuedAt(new java.util.Date(System.currentTimeMillis()))
                .expiration(new java.util.Date(System.currentTimeMillis() + expirationMs))
                .signWith(getSigningKey())
                .issuer("signaro.com")
                .id(UUID.randomUUID().toString())
                .compact();
    }

    public String generateAccessToken(JwtUserClaims userClaims) {
        return generateToken(userClaims, jwtAccessTokenExpirationMs);
    }

    public String generateRefreshToken(JwtUserClaims userClaims) {
        return generateToken(userClaims, jwtRefreshTokenExpirationMs);
    }

    public String getAccessToken(JwtUserClaims jwtUserClaims) {
        try {
            return generateAccessToken(jwtUserClaims);
        } catch (JwtException e) {
            log.error("Error generating access token", e);
            throw new IllegalStateException("Cannot generate access token");
        }
    }

    public ResponseCookie getRefreshTokenCookie(JwtUserClaims jwtUserClaims) {
        try {
            String refreshToken = generateRefreshToken(jwtUserClaims);

            return cookieService.createCookie("refreshToken", refreshToken, getJwtRefreshTokenExpirationMs());
        } catch (JwtException e) {
            log.error("Error generating refresh token", e);
            throw new IllegalStateException("Cannot generate access token");
        }
    }
}
