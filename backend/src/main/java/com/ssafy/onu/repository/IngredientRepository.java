package com.ssafy.onu.repository;

import com.ssafy.onu.entity.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IngredientRepository extends JpaRepository<Ingredient, Integer> {
    Ingredient findByIngredientId(int ingredientId);
    Ingredient findByIngredientName(String ingredientName);
}
