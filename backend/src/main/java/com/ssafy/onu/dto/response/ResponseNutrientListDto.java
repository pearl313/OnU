package com.ssafy.onu.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseNutrientListDto {
    private Long nutrientId;
    private String nutrientName;
    private  String nutrientImageUrl;
    private  String nutrientBrand;
    private boolean isInterested;

    @Builder
    public ResponseNutrientListDto(Long nutrientId, String nutrientName, String nutrientImageUrl, String nutrientBrand) {
        this.nutrientId = nutrientId;
        this.nutrientName = nutrientName;
        this.nutrientImageUrl = nutrientImageUrl;
        this.nutrientBrand = nutrientBrand;
    }
    public ResponseNutrientListDto(Long nutrientId, String nutrientName, String nutrientImageUrl, String nutrientBrand, boolean isInterested) {
        this.nutrientId = nutrientId;
        this.nutrientName = nutrientName;
        this.nutrientImageUrl = nutrientImageUrl;
        this.nutrientBrand = nutrientBrand;
        this.isInterested = isInterested;
    }
}
