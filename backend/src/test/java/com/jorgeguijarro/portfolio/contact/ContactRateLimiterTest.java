package com.jorgeguijarro.portfolio.contact.service;

import com.jorgeguijarro.portfolio.contact.service.ContactRateLimiter;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.Clock;
import java.time.Instant;
import java.time.ZoneId;
import org.junit.jupiter.api.Test;

class ContactRateLimiterTest {
    @Test
    void limitsOneAddressAndResetsAfterWindow() {
        MutableClock clock = new MutableClock();
        ContactRateLimiter limiter = new ContactRateLimiter(clock);
        for (int i = 0; i < 5; i++) assertTrue(limiter.allow("198.51.100.1"));
        assertFalse(limiter.allow("198.51.100.1"));
        assertTrue(limiter.allow("198.51.100.2"));
        clock.now = clock.now.plusSeconds(15 * 60);
        assertTrue(limiter.allow("198.51.100.1"));
    }

    private static class MutableClock extends Clock {
        private Instant now = Instant.parse("2026-10-07T10:00:00Z");
        @Override public ZoneId getZone() { return ZoneId.of("UTC"); }
        @Override public Clock withZone(ZoneId zone) { return this; }
        @Override public Instant instant() { return now; }
    }
}
