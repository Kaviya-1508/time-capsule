package com.example.timecapsulebackend.service;

import com.sendgrid.*;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import com.example.timecapsulebackend.model.Capsule;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.format.DateTimeFormatter;

@Service
@Slf4j
public class EmailService {

    @Value("${sendgrid.api-key}")
    private String sendGridApiKey;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public boolean sendCapsuleEmail(Capsule capsule) {
        String subject = "⏰ Your Time Capsule Has Arrived!";
        String body = buildEmailContent(capsule);
        return sendEmail(capsule.getEmail(), subject, body);
    }

    private boolean sendEmail(String to, String subject, String body) {
        Email from = new Email(fromEmail);
        Email toEmail = new Email(to);
        Content content = new Content("text/html", body);
        Mail mail = new Mail(from, subject, toEmail, content);

        SendGrid sg = new SendGrid(sendGridApiKey);
        Request request = new Request();

        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            Response response = sg.api(request);

            log.info("Email sent to {} with status: {}", to, response.getStatusCode());
            return response.getStatusCode() == 202;
        } catch (IOException ex) {
            log.error("Failed to send email to {}: {}", to, ex.getMessage());
            return false;
        }
    }

    private String buildEmailContent(Capsule capsule) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MMMM yyyy, hh:mm a");

        return String.format("""
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; background: #f4f4f4; }
                        .container { max-width: 600px; margin: 0 auto; background: white; 
                                   padding: 30px; border-radius: 10px; }
                        .header { text-align: center; color: #333; }
                        .emoji { font-size: 50px; }
                        .message-box { background: #f9f9f9; padding: 20px; border-left: 4px solid #6c5ce7; 
                                     margin: 20px 0; border-radius: 5px; }
                        .footer { text-align: center; color: #b2bec3; font-size: 12px; margin-top: 30px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <div class="emoji">📦✨</div>
                            <h1>Your Time Capsule Has Arrived!</h1>
                        </div>
                        <p>Hello Future Self,</p>
                        <div class="message-box">
                            <p>%s</p>
                        </div>
                        <p>📅 Created: %s</p>
                        <p>⏰ Delivered: %s</p>
                        <div class="footer">
                            <p>🕰️ Time Capsule · Messages to the Future</p>
                        </div>
                    </div>
                </body>
                </html>
                """,
                capsule.getMessage(),
                capsule.getCreatedAt().format(formatter),
                capsule.getDeliveryTime().format(formatter)
        );
    }
}