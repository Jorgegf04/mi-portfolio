package com.jorgeguijarro.portfolio.contact;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ContactController {
    private final ContactService service;
    private final ContactRateLimiter limiter;
    private final boolean trustProxy;

    public ContactController(ContactService service, ContactRateLimiter limiter,
                             @Value("${contact.trust-proxy:false}") boolean trustProxy) {
        this.service = service;
        this.limiter = limiter;
        this.trustProxy = trustProxy;
    }

    @GetMapping("/health")
    public Map<String, String> health() { return Map.of("status", "ok"); }

    @PostMapping("/contact")
    public ResponseEntity<ApiResponse> contact(@Valid @RequestBody ContactRequest body, HttpServletRequest request) {
        String address = request.getRemoteAddr();
        if (trustProxy && request.getHeader("X-Real-IP") != null) {
            address = request.getHeader("X-Real-IP");
        }
        if (!limiter.allow(address)) throw new TooManyRequestsException();
        if (body.website() == null || body.website().isBlank()) service.send(body);
        return ResponseEntity.ok(new ApiResponse("sent", "Mensaje enviado correctamente."));
    }
}
