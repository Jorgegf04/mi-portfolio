package com.jorgeguijarro.portfolio.contact;

import com.jorgeguijarro.portfolio.contact.dto.ContactRequest;
import com.jorgeguijarro.portfolio.contact.service.ContactService;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.icegreen.greenmail.util.GreenMail;
import com.icegreen.greenmail.util.ServerSetupTest;
import jakarta.mail.internet.MimeMessage;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

class ContactSmtpIntegrationTest {
    @Test
    void deliversThroughRealLocalSmtpServer() throws Exception {
        GreenMail smtp = new GreenMail(ServerSetupTest.SMTP.dynamicPort());
        smtp.start();
        try {
            JavaMailSenderImpl sender = new JavaMailSenderImpl();
            sender.setHost("127.0.0.1");
            sender.setPort(smtp.getSmtp().getPort());
            @SuppressWarnings("unchecked")
            ObjectProvider<JavaMailSender> provider = mock(ObjectProvider.class);
            when(provider.getIfAvailable()).thenReturn(sender);
            ContactService service = new ContactService(provider, "127.0.0.1", "jgfestudios@gmail.com", "jgfestudios@gmail.com");

            service.send(new ContactRequest("Ana", "ana@example.com", "Colaboración",
                    "Me gustaría hablar sobre un proyecto web.", ""));

            assertTrue(smtp.waitForIncomingEmail(5000, 1));
            MimeMessage email = smtp.getReceivedMessages()[0];
            assertEquals("Portfolio: Colaboración", email.getSubject());
            assertEquals("ana@example.com", email.getReplyTo()[0].toString());
            assertEquals("jgfestudios@gmail.com", email.getRecipients(jakarta.mail.Message.RecipientType.TO)[0].toString());
        } finally {
            smtp.stop();
        }
    }
}
