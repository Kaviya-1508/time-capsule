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
    public void scheduledCheck() {
        log.info("🔍 Scheduled check running...");
        checkAndDeliver();
    }

    public void checkAndDeliver() {
        LocalDateTime now = LocalDateTime.now();
        log.info("⏰ Current time: {}", now);
        
        List<Capsule> ready = capsuleRepository
                .findByDeliveryTimeLessThanEqualAndStatus(now, "PENDING");

        log.info("📦 Found {} capsule(s) ready for delivery", ready.size());

        for (Capsule capsule : ready) {
            log.info("🚀 Attempting delivery for capsule: {}", capsule.getId());
            boolean sent = emailService.sendCapsuleEmail(capsule);
            if (sent) {
                capsule.setStatus("DELIVERED");
                capsule.setDeliveredAt(now);
                capsuleRepository.save(capsule);
                log.info("✅ Delivered: {}", capsule.getId());
            } else {
                log.error("❌ Failed to deliver: {}", capsule.getId());
            }
        }
    }
}
