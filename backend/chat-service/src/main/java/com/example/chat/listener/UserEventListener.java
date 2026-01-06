package com.example.chat.listener;

import com.example.chat.config.RabbitMqConfig;
import com.example.chat.events.UserDeletedEvent;
import com.example.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class UserEventListener {

    private final ChatService chatService;

    @RabbitListener(queues = RabbitMqConfig.USER_DELETED_QUEUE)
    public void onUserDeleted(UserDeletedEvent event) {
        chatService.deleteAllChatsByUserId(event.userId());
    }
}
