package com.jorgeguijarro.portfolio.contact.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record ContactRequest(
        @NotBlank @Size(max = 100) @Pattern(regexp = "[^\\r\\n]*") String name,
        @NotBlank @Email @Size(max = 254) String email,
        @NotBlank @Size(max = 150) @Pattern(regexp = "[^\\r\\n]*") String subject,
        @NotBlank @Size(min = 20, max = 3000) String message,
        String website
) {}
