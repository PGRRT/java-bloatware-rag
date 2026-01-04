package com.example.user.publisher;

import com.example.user.events.UserDeletedEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
@RequiredArgsConstructor
@Slf4j
public class UserEventPublisher {
    private final RabbitTemplate rabbitTemplate;

    public static final String EXCHANGE = "chat.topic.exchange";
    public static final String ROUTING_KEY = "user.deleted";

    public void publishUserDeleted(UUID userId) {
        log.info("Publishing user deleted event for: {}", userId);
        UserDeletedEvent event = new UserDeletedEvent(userId);

        rabbitTemplate.convertAndSend(EXCHANGE, ROUTING_KEY, event);
    }
}
