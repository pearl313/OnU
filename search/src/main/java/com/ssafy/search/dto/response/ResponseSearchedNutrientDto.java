package com.ssafy.search.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseSearchedNutrientDto {
    private Long nutrientId;

    private String nutrientName;

    private String nutrientBrand;

    private String nutrientImageUrl;
}
