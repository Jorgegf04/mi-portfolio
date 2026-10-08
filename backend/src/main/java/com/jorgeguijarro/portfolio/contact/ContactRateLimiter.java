package com.jorgeguijarro.portfolio.contact;

import java.time.Clock;
import java.time.Duration;
import java.time.Instant;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import org.springframework.stereotype.Component;

@Component
public class ContactRateLimiter {
    private static final int LIMIT = 5;
    private static final Duration WINDOW = Duration.ofMinutes(15);
    private final ConcurrentHashMap<String, Window> windows = new ConcurrentHashMap<>();
    private final AtomicInteger attempts = new AtomicInteger();
    private final Clock clock;

    public ContactRateLimiter() { this(Clock.systemUTC()); }

    ContactRateLimiter(Clock clock) { this.clock = clock; }

    public boolean allow(String address) {
        Instant now = clock.instant();
        Window result = windows.compute(address, (key, prior) -> {
            if (prior == null || !now.isBefore(prior.start().plus(WINDOW))) return new Window(now, 1);
            return new Window(prior.start(), prior.count() + 1);
        });
        if (attempts.incrementAndGet() % 128 == 0) {
            windows.entrySet().removeIf(entry -> !now.isBefore(entry.getValue().start().plus(WINDOW)));
        }
        return result.count() <= LIMIT;
    }

    private record Window(Instant start, int count) {}
}
