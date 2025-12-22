package com.example.user.security;

import com.example.user.config.SecurityConfig;
import com.example.user.service.AuthService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;

@Component
@RequiredArgsConstructor
public class TokenBlacklistFilter extends OncePerRequestFilter {

    private final AuthService authService;

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getServletPath();
        return SecurityConfig.publicUrls.contains(path);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String accessToken = authHeader.substring(7);
            if (authService.isTokenBlacklisted(accessToken)) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Access token is blacklisted");
                return;
            }
        }

        if (request.getCookies() != null) {
            String refreshToken = Arrays.stream(request.getCookies())
                    .filter(cookie -> "refreshToken".equals(cookie.getName()))
                    .findFirst()
                    .map(Cookie::getValue)
                    .orElse(null);

            if (refreshToken != null && authService.isTokenBlacklisted(refreshToken)) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Refresh token is blacklisted");
                return;
            }
        }

        filterChain.doFilter(request, response);
    }
}
