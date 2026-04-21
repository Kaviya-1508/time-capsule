package com.example.timecapsulebackend.model;

import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "capsules")
public class Capsule {
    @Id
    private String id;
    private String message;
    private String email;
    private LocalDateTime deliveryTime;
    private String status; // PENDING, DELIVERED
    private LocalDateTime createdAt;
    private LocalDateTime deliveredAt;
}