package com.ssafy.onu.dto.response;

import com.ssafy.onu.entity.Nutrient;
import lombok.Getter;

@Getter
public class ResponseCombinationNutrientInfoDto {
    private Long nutrientId;
    private String nutrientName;
    private String nutrientImageUrl;
    private String nutrientBrand;

    public ResponseCombinationNutrientInfoDto(Nutrient nutrient) {
        this.nutrientId = nutrient.getNutrientId();
        this.nutrientName = nutrient.getNutrientName();
        this.nutrientImageUrl = nutrient.getNutrientImageUrl();
        this.nutrientBrand = nutrient.getNutrientBrand();
    }
}
