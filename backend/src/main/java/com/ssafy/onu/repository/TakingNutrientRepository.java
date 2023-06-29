package com.ssafy.onu.repository;

import com.ssafy.onu.entity.Nutrient;
import com.ssafy.onu.entity.TakingNutrient;
import com.ssafy.onu.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TakingNutrientRepository extends JpaRepository<TakingNutrient, Integer> {
    List<TakingNutrient> findByUser(User user);
    Optional<TakingNutrient> findByUserAndNutrient(User user, Nutrient nutrient);
    List<TakingNutrient> findByUser_UserId(int userId);

}
