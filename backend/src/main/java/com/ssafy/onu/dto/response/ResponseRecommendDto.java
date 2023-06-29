package com.ssafy.onu.dto.response;

import lombok.Getter;

import java.util.LinkedList;

@Getter
public class ResponseRecommendDto {
    private String ingredientName;
    private LinkedList<ResponseRecommendNutrientDto> nutrientDtoLinkedList;

    public ResponseRecommendDto(String ingredientName, LinkedList<ResponseRecommendNutrientDto> nutrientDtoLinkedList) {
        this.ingredientName = ingredientName;
        this.nutrientDtoLinkedList = nutrientDtoLinkedList;
    }
}
