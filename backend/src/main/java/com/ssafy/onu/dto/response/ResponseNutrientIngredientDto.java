package com.ssafy.onu.dto.response;

import lombok.Getter;

import java.util.List;

@Getter
public class ResponseNutrientIngredientDto {
    private long nutrientId;
    private List<ResponseNutrientIngredientInfoDto> ingredientInfoList;

    public ResponseNutrientIngredientDto(long nutrientId, List<ResponseNutrientIngredientInfoDto> ingredientInfoList) {
        this.nutrientId = nutrientId;
        this.ingredientInfoList = ingredientInfoList;
    }
}
