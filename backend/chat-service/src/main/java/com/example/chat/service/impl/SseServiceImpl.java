package com.example.chat.service.impl;

import com.example.chat.domain.enums.ChatEvent;
import com.example.chat.service.ChatBindingService;
import com.example.chat.service.SseService;
import jakarta.annotation.PreDestroy;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class SseServiceImpl implements SseService {
    // Map: chatId -> set of emitters (one emitter per connected client)
    private final Map<UUID, CopyOnWriteArraySet<SseEmitter>> emitters = new ConcurrentHashMap<>();

    // Map: emitter -> scheduled ping task, so we can cancel ping when emitter is removed
    private final ConcurrentMap<SseEmitter, ScheduledFuture<?>> scheduledPings = new ConcurrentHashMap<>();

    // Executor for scheduled pings. Size can be tuned depending on load
    // Here we use 2 threads as a reasonable default - measure and adjust as needed
    private final ScheduledExecutorService scheduler =
            Executors.newScheduledThreadPool(2);

    private static final long DEFAULT_TIMEOUT = 0L; // no timeout, emitter can be detected closed via pings
    private static final long PING_INTERVAL_MS = 5 * 60 * 1000L; // each 5 minutes send a ping to check connection liveness
    private static final long PING_DELAY_MS = 15 * 1000L; // 15s, initial delay before first ping
    private final ChatBindingService chatBindingService;

    @Override
    public boolean hasEmitters(UUID chatId) {
        Set<SseEmitter> set = emitters.get(chatId);
        return set != null && !set.isEmpty();
    }

    @Override
    public SseEmitter createEmitter(UUID chatId) {
        // create new emitter for this client
        SseEmitter emitter = new SseEmitter(DEFAULT_TIMEOUT);

        // ensure a set exists for this chatId
        CopyOnWriteArraySet<SseEmitter> set = emitters.computeIfAbsent(chatId, id -> new CopyOnWriteArraySet<>());

        // add emitter to the set
        set.add(emitter);
        // if this is the first emitter for this chat -> bind chat in RabbitMQ
        if (set.size() == 1) {
            try {
                chatBindingService.bindChat(chatId);
                log.info("Bound chat {} to exchange (first local subscriber)", chatId);
            } catch (Exception e) {
                log.error("Failed to bind chat {} on createEmitter", chatId, e);
                // decide: rethrow or continue; here we continue but log
            }
        }


        log.info("Added emitter for chat {} (total clients = {})", chatId, set.size());

        // lifecycle callbacks
        emitter.onCompletion(() -> {
            log.info("Emitter completed for chat {}", chatId);
            cleanupEmitter(chatId, emitter,null);
        });

        emitter.onTimeout(() -> {
            log.info("Emitter timed out for chat {}", chatId);
            try {
                // cleanup will be done in onCompletion
                emitter.complete();
            } catch (Exception ignore) {}
        });

        emitter.onError((Throwable e) -> {
            // We do not need to call emitter.complete() or manually remove the emitter here.
            // Spring's mechanism guarantees that if an error occurs (onError),
            // it will be immediately followed by the completion of the lifecycle (onCompletion).
            // Therefore, all cleanup is performed in a single place: onCompletion
            log.warn("Emitter error for chat {}: {}", chatId, e.getMessage());
        });

        ScheduledFuture<?> pingFuture = startPing(chatId, emitter);
        scheduledPings.put(emitter, pingFuture);

        return emitter;
    }

    private ScheduledFuture<?> startPing(UUID chatId, SseEmitter emitter) {
        ScheduledFuture<?> pingFuture =  scheduler.scheduleAtFixedRate(() -> {
            try {
                emitter.send(SseEmitter.event().name(ChatEvent.PING.name()).data("ping"));

                log.debug("Sent PING to emitter for chat {}", chatId);
            } catch (Exception e) {
                log.warn("Failed to send PING to emitter for chat {} — removing emitter", chatId, e);
                try { emitter.completeWithError(e); } catch (Exception ex) { log.debug("completeWithError failed: {}", ex.toString()); }
            }

        }, PING_DELAY_MS, PING_INTERVAL_MS, TimeUnit.MILLISECONDS);
        return pingFuture;
    }

    private void cleanupEmitter(UUID chatId, SseEmitter emitter, Throwable cause) {
        ScheduledFuture<?> f = scheduledPings.remove(emitter);
        if (f != null) {
            f.cancel(true);
        }

        CopyOnWriteArraySet<SseEmitter> set = emitters.get(chatId);
        if (set != null) {
            set.remove(emitter);
            log.info("Removed emitter for chat {} (remaining = {})", chatId, set.size());
            if (set.isEmpty()) {
                // remove the empty set to free memory
                emitters.remove(chatId);
                // last client disconnected -> unbind chat
                try {
                    chatBindingService.unBindChat(chatId);
                    log.info("Unbound chat {} from exchange (no local subscribers)", chatId);
                } catch (Exception e) {
                    log.error("Failed to unbind chat {} after last emitter removal", chatId, e);
                }
            }
        }
    }


    @Override
    public void emit(UUID chatId, ChatEvent eventName, String message) {
        CopyOnWriteArraySet<SseEmitter> set = emitters.get(chatId);
        if (set == null || set.isEmpty()) {
            log.debug("No emitters for chat {}, skipping emit", chatId);
            return;
        }

        String id = UUID.randomUUID().toString();
        for (SseEmitter emitter : set) {
            try {
                emitter.send(SseEmitter.event()
                        .id(id)
                        .name(eventName.name())
                        .data(message));
            } catch (Exception e) {
                log.warn("Failed to send to emitter for chat {} — removing emitter", chatId, e);
                try { emitter.completeWithError(e); } catch (Exception ex) { log.debug("completeWithError failed: {}", ex.toString()); }
            }
        }
    }

    @PreDestroy
    public void shutdown() {
        scheduler.shutdownNow();
    }
}
