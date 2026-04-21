package com.example.timecapsulebackend.service;

import com.example.timecapsulebackend.dto.CapsuleRequest;
import com.example.timecapsulebackend.dto.CapsuleResponse;
import com.example.timecapsulebackend.model.Capsule;
import com.example.timecapsulebackend.repository.CapsuleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CapsuleService {

    private final CapsuleRepository capsuleRepository;

    public CapsuleResponse createCapsule(CapsuleRequest request) {
        Capsule capsule = Capsule.builder()
                .message(request.getMessage())
                .email(request.getEmail())
                .deliveryTime(request.getDeliveryTime())
                .status("PENDING")
                .createdAt(LocalDateTime.now())
                .build();

        Capsule saved = capsuleRepository.save(capsule);
        return mapToResponse(saved);
    }

    public CapsuleResponse getCapsule(String id) {
        Capsule capsule = capsuleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Not found"));
        return mapToResponse(capsule);
    }

    public List<CapsuleResponse> getByEmail(String email) {
        return capsuleRepository.findByEmail(email).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private CapsuleResponse mapToResponse(Capsule c) {
        return CapsuleResponse.builder()
                .id(c.getId())
                .message(c.getMessage())
                .email(c.getEmail())
                .deliveryTime(c.getDeliveryTime())
                .status(c.getStatus())
                .createdAt(c.getCreatedAt())
                .build();
    }
}