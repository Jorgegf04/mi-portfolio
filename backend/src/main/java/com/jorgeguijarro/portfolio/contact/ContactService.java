package com.jorgeguijarro.portfolio.contact;

import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class ContactService {
    private final ObjectProvider<JavaMailSender> mailSender;
    private final String host;
    private final String sender;
    private final String recipient;

    public ContactService(ObjectProvider<JavaMailSender> mailSender,
                          @Value("${spring.mail.host:}") String host,
                          @Value("${contact.sender:}") String sender,
                          @Value("${contact.recipient:}") String recipient) {
        this.mailSender = mailSender;
        this.host = host;
        this.sender = sender;
        this.recipient = recipient;
    }

    public void send(ContactRequest request) {
        if (host.isBlank() || sender.isBlank() || recipient.isBlank()) throw new ContactDeliveryException();
        JavaMailSender senderClient = mailSender.getIfAvailable();
        if (senderClient == null) throw new ContactDeliveryException();

        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setFrom(sender);
        mail.setTo(recipient);
        mail.setReplyTo(request.email());
        mail.setSubject("Portfolio: " + request.subject());
        mail.setText("Nombre: " + request.name() + "\nCorreo: " + request.email() + "\n\n" + request.message());
        try {
            senderClient.send(mail);
        } catch (MailException exception) {
            throw new ContactDeliveryException();
        }
    }
}
