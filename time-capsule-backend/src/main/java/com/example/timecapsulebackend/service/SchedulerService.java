package com.example.timecapsulebackend.service;

import com.example.timecapsulebackend.model.Capsule;
import com.example.timecapsulebackend.repository.CapsuleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class SchedulerService {

    private final CapsuleRepository capsuleRepository;
    private final EmailService emailService;

    @Scheduled(fixedRateString = "${scheduler.fixed-rate:60000}")
    public void checkAndDeliver() {
        LocalDateTime now = LocalDateTime.now();
        List<Capsule> ready = capsuleRepository
                .findByDeliveryTimeLessThanEqualAndStatus(now, "PENDING");

        for (Capsule capsule : ready) {
            boolean sent = emailService.sendEmail(capsule);
            if (sent) {
                capsule.setStatus("DELIVERED");
                capsule.setDeliveredAt(now);
                capsuleRepository.save(capsule);
                log.info("✅ Delivered: {}", capsule.getId());
            }
        }
    }
}