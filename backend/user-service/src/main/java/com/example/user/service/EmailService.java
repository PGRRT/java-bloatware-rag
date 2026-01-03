package com.example.user.service;

public interface EmailService {
    void sendRegistrationEmail(String email, String otp);
    void sendEmail(String from, String to, String subject, String body);
}
