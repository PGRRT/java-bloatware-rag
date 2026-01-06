package com.example.user.events;

import java.util.UUID;

public record UserDeletedEvent(
        UUID userId
) {
}
