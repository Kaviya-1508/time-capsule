package com.example.timecapsulebackend.service;

import com.example.timecapsulebackend.model.Capsule;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    public boolean sendEmail(Capsule capsule) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(capsule.getEmail());
            message.setSubject("⏰ Your Time Capsule Has Arrived!");
            message.setText("""
                Your time capsule is here!
                
                Message from past you:
                "%s"
                
                Created: %s
                Delivered: %s
                
                - Time Capsule
                """.formatted(
                    capsule.getMessage(),
                    capsule.getCreatedAt(),
                    capsule.getDeliveryTime()
            ));

            mailSender.send(message);
            log.info("Email sent to: {}", capsule.getEmail());
            return true;
        } catch (Exception e) {
            log.error("Email failed: {}", e.getMessage());
            return false;
        }
    }
}