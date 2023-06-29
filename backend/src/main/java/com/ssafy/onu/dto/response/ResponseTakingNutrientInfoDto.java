package com.ssafy.onu.dto.response;

import com.ssafy.onu.entity.TakingNutrient;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ResponseTakingNutrientInfoDto {
    private Long nutrientId;

    private String nutrientName;

    private String nutrientBrand;

    private String nutrientImageUrl;
    private List<ResponseNutrientIngredientInfoDto> nutrientIngredientList;

    public ResponseTakingNutrientInfoDto(TakingNutrient takingNutrient, List<ResponseNutrientIngredientInfoDto> nutrientIngredientList) {
        this.nutrientId = takingNutrient.getNutrient().getNutrientId();
        this.nutrientName = takingNutrient.getNutrient().getNutrientName();
        this.nutrientBrand = takingNutrient.getNutrient().getNutrientBrand();
        this.nutrientImageUrl = takingNutrient.getNutrient().getNutrientImageUrl();
        this.nutrientIngredientList = nutrientIngredientList;
    }
}
