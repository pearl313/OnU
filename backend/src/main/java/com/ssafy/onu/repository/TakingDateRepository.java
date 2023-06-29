package com.ssafy.onu.repository;

import com.ssafy.onu.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import com.ssafy.onu.entity.TakingDate;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface TakingDateRepository extends JpaRepository<TakingDate, Date> {
    List<TakingDate> findByUserId_UserIdAndTakingDateDateContains(int userId, String date);
    Optional<TakingDate> findByUserIdAndAndTakingDateDate(User user, String takingDate);
}
