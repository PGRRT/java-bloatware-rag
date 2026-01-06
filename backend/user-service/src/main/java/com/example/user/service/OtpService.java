package com.example.user.service;

public interface OtpService {
    String generateOtp(String email);
    boolean verifyOtp(String email, String otp);
}
