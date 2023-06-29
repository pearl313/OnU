package com.ssafy.onu.repository;

import com.ssafy.onu.entity.Combination;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CombinationRepository extends JpaRepository<Combination, Integer> {
    Optional<Combination> findByCombinationUserIdAndCombinationId(int userId, int combinationId);
    List<Combination> findCombinationsByCombinationUserId(int userId);
}
