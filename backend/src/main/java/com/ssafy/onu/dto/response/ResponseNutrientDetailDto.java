package com.ssafy.onu.dto.response;

import com.ssafy.onu.entity.Nutrient;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ResponseNutrientDetailDto {
    private Long nutrientId;
    private String nutrientName;
    private String nutrientImageUrl;
    private String nutrientBrand;
    private String nutrientIntake;      //섭취 방법
    private String nutrientCaution;    //섭취 시 주의사항
    private String nutrientExpiration; //유효기간
    private String nutrientType;       //제형
    private String nutrientMaterial;  //원재료
    private boolean isInterested;
    private List<ResponseNutrientIngredientInfoDto> ingredientList;
    private List<String> functionList;

    public ResponseNutrientDetailDto(long nutrientId) {
        this.nutrientId = nutrientId;
    }

    public void setDetail(Nutrient nutrient) {
        this.nutrientName = nutrient.getNutrientName();
        this.nutrientImageUrl = nutrient.getNutrientImageUrl();
        this.nutrientBrand = nutrient.getNutrientBrand();
        this.nutrientIntake = nutrient.getNutrientIntake();
        this.nutrientCaution = nutrient.getNutrientCaution();
        this.nutrientExpiration = nutrient.getNutrientExpiration();
        this.nutrientType = nutrient.getNutrientTypeId().getNutrientType();
        this.nutrientMaterial = nutrient.getNutrientMaterial();
    }
}
