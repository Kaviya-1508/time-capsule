package com.example.timecapsulebackend.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class CapsuleRequest {
    @NotBlank(message = "Message required")
    private String message;

    @NotBlank @Email
    private String email;

    @NotNull @Future
    private LocalDateTime deliveryTime;
}