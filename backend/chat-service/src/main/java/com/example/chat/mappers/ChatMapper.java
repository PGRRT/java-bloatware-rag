package com.example.chat.mappers;


import com.example.chat.domain.dto.chat.request.CreateChatRequest;
import com.example.chat.domain.dto.chat.response.CreateChatResponse;
import com.example.chat.domain.entities.Chat;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ChatMapper {
    Chat toEntity(CreateChatRequest chatDTO);

    CreateChatResponse toResponse(Chat chat);
}
