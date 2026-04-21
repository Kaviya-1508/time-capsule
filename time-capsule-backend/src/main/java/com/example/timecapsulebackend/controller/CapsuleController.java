package com.example.timecapsulebackend.controller;

import com.example.timecapsulebackend.dto.CapsuleRequest;
import com.example.timecapsulebackend.dto.CapsuleResponse;
import com.example.timecapsulebackend.service.CapsuleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/capsules")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:3000",
        "https://time-capsule-frontend-sepia.vercel.app",
        "https://time-capsule-frontend-fkn8fp56i-kaviya-1508s-projects.vercel.app"
})
@RequiredArgsConstructor
public class CapsuleController {

    private final CapsuleService capsuleService;

    @PostMapping
    public ResponseEntity<CapsuleResponse> create(@Valid @RequestBody CapsuleRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(capsuleService.createCapsule(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CapsuleResponse> getById(@PathVariable String id) {
        return ResponseEntity.ok(capsuleService.getCapsule(id));
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<List<CapsuleResponse>> getByEmail(@PathVariable String email) {
        return ResponseEntity.ok(capsuleService.getByEmail(email));
    }
}