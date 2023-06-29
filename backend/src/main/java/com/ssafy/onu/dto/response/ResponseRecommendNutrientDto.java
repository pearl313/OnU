package com.ssafy.onu.dto.response;

import com.ssafy.onu.entity.Nutrient;
import lombok.Getter;

@Getter
public class ResponseRecommendNutrientDto {
    private Long nutrientId;
    private String nutrientName;
    private String nutrientImageUrl;
    private String nutrientBrand;
    private boolean isInterest;

    public ResponseRecommendNutrientDto(Nutrient nutrient) {
        this.nutrientId = nutrient.getNutrientId();
        this.nutrientBrand = nutrient.getNutrientBrand();
        this.nutrientName = nutrient.getNutrientName();
        this.nutrientImageUrl = nutrient.getNutrientImageUrl();
        this.isInterest = false;
    }

    public void setInterest(boolean interest) {
        isInterest = interest;
    }
}
