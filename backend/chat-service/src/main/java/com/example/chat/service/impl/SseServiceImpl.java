package com.example.chat.service.impl;

import com.example.chat.domain.enums.ChatEvent;
import com.example.chat.service.SseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Service
@RequiredArgsConstructor
public class SseServiceImpl implements SseService {
    private final Map<UUID, SseEmitter> emitters = new ConcurrentHashMap<>();
    private static final long DEFAULT_TIMEOUT = 60 * 60 * 1000L; // 1 hour

    public SseEmitter getEmitter(UUID chatId) {
        return emitters.get(chatId);
    }

    public SseEmitter createEmitter(UUID chatId) {
        SseEmitter emitter = new SseEmitter(DEFAULT_TIMEOUT);

        emitter.onTimeout(() -> {
            emitters.remove(chatId);
            log.info("Emitter timed out for chat {}", chatId);
        });

        emitter.onError((Throwable e) -> {
            emitters.remove(chatId);
            log.error("Emitter error for chat " + chatId, e);
        });

        emitter.onCompletion(() -> {
            emitters.remove(chatId);
            log.info("Emitter completed for chat {}", chatId);
        });

        emitters.put(chatId, emitter);
        log.info("Created emitter for chat {}", chatId);

        return emitter;
    }

    public void emit(UUID chatId, ChatEvent eventName, String message) {
        SseEmitter emitter = getEmitter(chatId);

        if (emitter != null) {
            String id = UUID.randomUUID().toString();
            try {
                emitter.send(SseEmitter.event()
                        .id(id)
                        .name(eventName.name())
                        .data(message));
            } catch (Exception e) {
                emitter.completeWithError(e);
                emitters.remove(chatId);
            }
        } else {
            log.warn("No emitter found for chat {}", chatId);
        }
    }
}
