package com.example.chat.service;

import com.example.chat.domain.dto.message.request.CreateMessageRequest;
import com.example.chat.domain.dto.message.response.CreateMessageResponse;
import com.example.chat.domain.dto.message.response.MessageResponse;
import java.util.UUID;

public interface MessageService {
    MessageResponse getMessageById(UUID chatId, UUID messageId);
    CreateMessageResponse createMessage(CreateMessageRequest createMessageRequest, UUID chatId, UUID userId);
    void deleteMessage(UUID chatId, UUID messageId, UUID userId);
    void saveBotMessage(UUID chatId, String generatedResponse);
}
