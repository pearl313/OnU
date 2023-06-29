package com.ssafy.onu.repository;

import com.ssafy.onu.entity.Continuous;
import com.ssafy.onu.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ContinuousRepository extends JpaRepository<Continuous, Integer> {
    Optional<Continuous> findByContinuousUserId(User userId);
    Optional<Continuous> findByContinuousUserId_UserId(int userId);
}
