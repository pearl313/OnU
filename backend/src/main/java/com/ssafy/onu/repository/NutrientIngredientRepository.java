package com.ssafy.onu.repository;

import com.ssafy.onu.entity.NutrientIngredient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface NutrientIngredientRepository extends JpaRepository<NutrientIngredient, Integer> {
    List<NutrientIngredient> findNutrientIngredientsByNutrient_NutrientId(Long nutrientId);

    List<NutrientIngredient> findNutrientIngredientByIngredient_IngredientId(int ingredientId);
}
