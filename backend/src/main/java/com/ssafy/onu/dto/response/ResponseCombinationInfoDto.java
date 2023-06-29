package com.ssafy.onu.dto.response;

import com.ssafy.onu.entity.Combination;
import lombok.Getter;

import java.util.List;

@Getter
public class ResponseCombinationInfoDto {
    private int combinationId;
    private List<ResponseCombinationNutrientInfoDto> nutrientInfoList;

    public ResponseCombinationInfoDto(Combination combination, List<ResponseCombinationNutrientInfoDto> nutrientInfoList) {
        this.combinationId = combination.getCombinationId();
        this.nutrientInfoList = nutrientInfoList;
    }
}
