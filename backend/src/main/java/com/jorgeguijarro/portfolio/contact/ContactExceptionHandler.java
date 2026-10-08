package com.jorgeguijarro.portfolio.contact;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ContactExceptionHandler {
    @ExceptionHandler({MethodArgumentNotValidException.class, HttpMessageNotReadableException.class})
    ResponseEntity<ApiResponse> invalid() {
        return ResponseEntity.badRequest().body(new ApiResponse("invalid", "Revisa los campos del formulario."));
    }

    @ExceptionHandler(TooManyRequestsException.class)
    ResponseEntity<ApiResponse> limited() {
        return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                .body(new ApiResponse("limited", "Espera unos minutos antes de volver a enviar un mensaje."));
    }

    @ExceptionHandler(ContactDeliveryException.class)
    ResponseEntity<ApiResponse> unavailable() {
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                .body(new ApiResponse("unavailable", "El formulario no está disponible ahora."));
    }

    @ExceptionHandler(Exception.class)
    ResponseEntity<ApiResponse> unexpected() {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse("error", "No se pudo procesar la solicitud."));
    }
}
