package com.ssafy.onu.repository;

import com.ssafy.onu.entity.Nutrient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface NutrientRepository extends JpaRepository<Nutrient, Integer> {
    Optional<Nutrient> findByNutrientId(Long nutrientId);

    List<Nutrient> findNutrientsByNutrientIdIn(List<Long> nutrientIds);

    @Query(value = "SELECT * FROM nutrient WHERE MATCH(nutrient_name, nutrient_brand) AGAINST(?1)", nativeQuery = true)
    List<Nutrient> searchNutrient(String keyword);

    List<Nutrient> findByNutrientTypeId_NutrientTypeIdInAndNutrientChildInAndNutrientPregnantIn(List<Integer> typeId, boolean[] nutrientChild, boolean[] pregnant);
}
