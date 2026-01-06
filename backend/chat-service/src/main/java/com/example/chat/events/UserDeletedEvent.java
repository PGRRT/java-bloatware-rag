package com.example.chat.events;

import java.util.UUID;

public record UserDeletedEvent(
        UUID userId
) {
}
