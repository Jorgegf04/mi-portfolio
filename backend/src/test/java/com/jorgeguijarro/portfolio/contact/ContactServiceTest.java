package com.jorgeguijarro.portfolio.contact;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.mail.MailSendException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

class ContactServiceTest {
    @SuppressWarnings("unchecked")
    private final ObjectProvider<JavaMailSender> provider = mock(ObjectProvider.class);
    private final JavaMailSender sender = mock(JavaMailSender.class);
    private final ContactRequest request = new ContactRequest("Ana", "ana@example.com", "Entrevista", "Me gustaría hablar sobre el puesto.", "");

    @Test
    void sendsPlainTextWithFixedFromAndVisitorReplyTo() {
        when(provider.getIfAvailable()).thenReturn(sender);
        ContactService service = new ContactService(provider, "smtp.example.com", "owner@example.com", "inbox@example.com");

        service.send(request);

        ArgumentCaptor<SimpleMailMessage> captor = ArgumentCaptor.forClass(SimpleMailMessage.class);
        verify(sender).send(captor.capture());
        SimpleMailMessage mail = captor.getValue();
        assertEquals("owner@example.com", mail.getFrom());
        assertEquals("inbox@example.com", mail.getTo()[0]);
        assertEquals("ana@example.com", mail.getReplyTo());
        assertEquals("Portfolio: Entrevista", mail.getSubject());
    }

    @Test
    void doesNotClaimDeliveryWithoutConfiguration() {
        ContactService service = new ContactService(provider, "", "owner@example.com", "inbox@example.com");
        assertThrows(ContactDeliveryException.class, () -> service.send(request));
    }

    @Test
    void hidesProviderFailure() {
        when(provider.getIfAvailable()).thenReturn(sender);
        doThrow(new MailSendException("provider details")).when(sender).send(org.mockito.ArgumentMatchers.any(SimpleMailMessage.class));
        ContactService service = new ContactService(provider, "smtp.example.com", "owner@example.com", "inbox@example.com");
        assertThrows(ContactDeliveryException.class, () -> service.send(request));
    }
}
