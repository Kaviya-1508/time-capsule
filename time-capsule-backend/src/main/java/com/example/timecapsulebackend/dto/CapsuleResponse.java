package com.example.timecapsulebackend.dto;


import lombok.Data;
import lombok.Builder;
import java.time.LocalDateTime;

@Data
@Builder
public class CapsuleResponse {
    private String id;
    private String message;
    private String email;
    private LocalDateTime deliveryTime;
    private String status;
    private LocalDateTime createdAt;
}