package com.ssafy.onu.dto.response;

import com.ssafy.onu.entity.NutrientIngredient;
import lombok.Getter;

import java.util.StringTokenizer;

@Getter
public class ResponseNutrientIngredientInfoDto {
    private String ingredientName;
    private String ingredientAmount;
    private String recommendedIntakeStart;
    private String recommendedIntakeEnd;

    public ResponseNutrientIngredientInfoDto(NutrientIngredient nutrientIngredient) {
        this.ingredientName = nutrientIngredient.getIngredient().getIngredientName();
        this.ingredientAmount = nutrientIngredient.getIngredientAmount();
        this.recommendedIntakeStart = nutrientIngredient.getIngredient().getIngredientRecommendedIntakeStart();
        this.recommendedIntakeEnd = nutrientIngredient.getIngredient().getIngredientRecommendedIntakeEnd();
    }

    public ResponseNutrientIngredientInfoDto(String ingredientName, String ingredientAmount) {
        this.ingredientName = ingredientName;
        this.ingredientAmount = ingredientAmount;
    }

    public void setIntake(String intake){
        StringTokenizer stringTokenizer = new StringTokenizer(intake,"~");
        this.recommendedIntakeStart = stringTokenizer.nextToken();
        this.recommendedIntakeEnd = stringTokenizer.nextToken();
    }
}
