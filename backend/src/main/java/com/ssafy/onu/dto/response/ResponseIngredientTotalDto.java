package com.ssafy.onu.dto.response;

import lombok.Getter;

@Getter
public class ResponseIngredientTotalDto {
    private String nutrientName;
    private String nutrientAmount;
    private Double nutrientMin;
    private Double nutrientMax;

    public ResponseIngredientTotalDto(String nutrientName, String nutrientAmount, Double nutrientMin, Double nutrientMax) {
        this.nutrientName = nutrientName;
        this.nutrientAmount = nutrientAmount;
        this.nutrientMin = nutrientMin;
        this.nutrientMax = nutrientMax;
    }
}
