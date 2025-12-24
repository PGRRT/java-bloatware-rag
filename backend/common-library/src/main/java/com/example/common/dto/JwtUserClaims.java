package com.example.common.dto;

import lombok.Builder;

import java.util.UUID;

@Builder
public record JwtUserClaims(UUID userId, String email, String role) {
}
