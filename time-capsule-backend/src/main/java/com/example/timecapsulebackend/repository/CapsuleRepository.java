package com.example.timecapsulebackend.repository;

import com.example.timecapsulebackend.model.Capsule;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface CapsuleRepository extends MongoRepository<Capsule, String> {
    List<Capsule> findByDeliveryTimeLessThanEqualAndStatus(LocalDateTime now, String status);
    List<Capsule> findByStatus(String status);
    List<Capsule> findByEmail(String email);
}