package com.example.chat.listener;

import com.example.chat.domain.enums.ChatEvent;
import com.example.chat.events.BotMessageEvent;
import com.example.chat.service.SseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Slf4j
@Component
@RequiredArgsConstructor
public class BotMessageListener {

    private final SseService sseService;

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handleBotMessageEvent(BotMessageEvent event) {
        sseService.emit(event.chatId(), ChatEvent.CHAT_MESSAGE, event.message());

    }

}
