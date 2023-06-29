package com.ssafy.onu.repository;

import com.ssafy.onu.entity.Alarm;
import com.ssafy.onu.entity.Auth;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AlarmRepository extends JpaRepository<Alarm, Integer> {
    Optional<Alarm> findByAlarmUserId_UserId(int userId);
}
