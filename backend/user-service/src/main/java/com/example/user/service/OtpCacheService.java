package com.example.user.service;

public interface OtpCacheService {
    void saveOtp(String email, String otp);
    String getOtp(String email);
    void deleteOtp(String email);
}
