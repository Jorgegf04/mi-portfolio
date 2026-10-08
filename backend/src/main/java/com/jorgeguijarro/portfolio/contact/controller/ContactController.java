package com.jorgeguijarro.portfolio.contact.controller;

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
import com.jorgeguijarro.portfolio.contact.dto.ApiResponse;
import com.jorgeguijarro.portfolio.contact.dto.ContactRequest;
import com.jorgeguijarro.portfolio.contact.exception.TooManyRequestsException;
import com.jorgeguijarro.portfolio.contact.service.ContactService;
import com.jorgeguijarro.portfolio.contact.service.ContactRateLimiter;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api")
@Tag(name = "Portfolio", description = "Estado del servicio y formulario de contacto")
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
    @Operation(summary = "Comprobar el estado de la API")
    public Map<String, String> health() { return Map.of("status", "ok"); }

    @PostMapping("/contact")
    @Operation(summary = "Enviar un mensaje de contacto", description = "Valida y envía el mensaje por correo. Límite: cinco solicitudes por IP cada 15 minutos.")
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Mensaje procesado", content = @io.swagger.v3.oas.annotations.media.Content(schema = @io.swagger.v3.oas.annotations.media.Schema(implementation = ApiResponse.class))),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "400", description = "Datos inválidos"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "413", description = "El cuerpo supera 8 KiB"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "429", description = "Límite de solicitudes alcanzado"),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "503", description = "El envío de correo no está disponible")
    })
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
