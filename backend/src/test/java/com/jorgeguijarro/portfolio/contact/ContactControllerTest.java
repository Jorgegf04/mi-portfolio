package com.jorgeguijarro.portfolio.contact;

import static org.hamcrest.Matchers.containsString;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

class ContactControllerTest {
    private ContactService service;
    private MockMvc mvc;
    private static final String VALID = """
            {"name":"Ana","email":"ana@example.com","subject":"Trabajo","message":"Me gustaría hablar sobre el puesto.","website":""}
            """;

    @BeforeEach
    void setup() {
        service = mock(ContactService.class);
        LocalValidatorFactoryBean validator = new LocalValidatorFactoryBean();
        validator.afterPropertiesSet();
        mvc = MockMvcBuilders.standaloneSetup(new ContactController(service, new ContactRateLimiter(), false))
                .setControllerAdvice(new ContactExceptionHandler())
                .setValidator(validator)
                .addFilters(new ContactSizeFilter())
                .build();
    }

    @Test
    void healthAndSuccessfulContact() throws Exception {
        mvc.perform(get("/api/health")).andExpect(status().isOk()).andExpect(jsonPath("$.status").value("ok"));
        mvc.perform(post("/api/contact").contentType(MediaType.APPLICATION_JSON).content(VALID))
                .andExpect(status().isOk()).andExpect(jsonPath("$.status").value("sent"));
        verify(service).send(any(ContactRequest.class));
    }

    @Test
    void invalidEmailAndOversizedBodyAreRejected() throws Exception {
        mvc.perform(post("/api/contact").contentType(MediaType.APPLICATION_JSON)
                .content(VALID.replace("ana@example.com", "invalid")))
                .andExpect(status().isBadRequest()).andExpect(jsonPath("$.status").value("invalid"));
        mvc.perform(post("/api/contact").contentType(MediaType.APPLICATION_JSON)
                .content("x".repeat(8193)))
                .andExpect(status().isPayloadTooLarge()).andExpect(jsonPath("$.status").value("too_large"));
    }

    @Test
    void providerFailureIsSafeAndRateLimitIsEnforced() throws Exception {
        doThrow(new ContactDeliveryException()).when(service).send(any(ContactRequest.class));
        for (int i = 0; i < 5; i++) {
            mvc.perform(post("/api/contact").contentType(MediaType.APPLICATION_JSON).content(VALID))
                    .andExpect(status().isServiceUnavailable()).andExpect(jsonPath("$.message").value("El formulario no está disponible ahora."));
        }
        mvc.perform(post("/api/contact").contentType(MediaType.APPLICATION_JSON).content(VALID))
                .andExpect(status().isTooManyRequests());
    }

    @Test
    void honeypotAcknowledgesWithoutSending() throws Exception {
        mvc.perform(post("/api/contact").contentType(MediaType.APPLICATION_JSON)
                .content(VALID.replace("\"website\":\"\"", "\"website\":\"bot\"")))
                .andExpect(status().isOk());
        verify(service, never()).send(any(ContactRequest.class));
    }
}
