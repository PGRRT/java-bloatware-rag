package com.example.user.domain.dto.auth;

import com.example.user.domain.dto.user.response.UserResponse;
import org.springframework.http.ResponseCookie;

public record AuthResult(
        UserResponse userResponse,
        String accessToken,
        ResponseCookie refreshTokenCookie
) {
}
