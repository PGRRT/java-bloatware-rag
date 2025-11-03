package com.example.medai.exceptions;

public class OtpInvalidException extends RuntimeException {
    public OtpInvalidException(String message) {
        super(message);
    }
}
