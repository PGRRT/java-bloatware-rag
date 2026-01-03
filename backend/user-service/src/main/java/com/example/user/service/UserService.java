package com.example.user.service;

import com.example.user.domain.dto.user.request.RegisterUserRequest;
import com.example.user.domain.dto.user.response.UserResponse;

public interface UserService {
    UserResponse saveUser(RegisterUserRequest registerUserRequest, boolean hasOtpValid);
    UserResponse getCurrentUser(String accessToken);
}
