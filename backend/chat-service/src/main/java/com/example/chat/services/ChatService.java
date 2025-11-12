package com.example.chat.services;

import com.example.chat.domain.dto.chat.request.CreateChatRequest;
import com.example.chat.domain.dto.chat.response.CreateChatResponse;
import com.example.chat.domain.entities.Chat;
import com.example.chat.domain.entities.User;
import com.example.chat.mappers.ChatMapper;
import com.example.chat.repositories.ChatRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;
    private final ChatMapper chatMapper;

    public CreateChatResponse saveChat(CreateChatRequest chatRequest) {

        Chat chat = chatMapper.toEntity(chatRequest);

        // sample user
        User user = new User();
        user.setId(UUID.fromString("123e4567-e89b-12d3-a456-426614174000"));
        chat.setUser(user);

        // in future replace with actual user fetching
        //        User user = userRepository.findById(chatRequest.getUserId())
        //                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + chatRequest.getUserId()));


        chatRepository.save(chat);

        CreateChatResponse createChatResponse = chatMapper.toResponse(chat);
        return createChatResponse;
    }

}
