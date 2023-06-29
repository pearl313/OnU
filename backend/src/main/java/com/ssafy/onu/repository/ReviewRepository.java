package com.ssafy.onu.repository;

import com.ssafy.onu.entity.Nutrient;
import com.ssafy.onu.entity.Review;
import com.ssafy.onu.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
    Optional<Review> findByReviewId(int reviewId);
    List<Review> findByNutrientId_NutrientId(Long nutrientId);
    Optional<Review> findByUserIdAndNutrientId(User userId, Nutrient nutrientId);
    List<Review> findByUserId(User userId);
}
