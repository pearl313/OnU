package com.ssafy.onu.dto.request;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Getter
public class ReqRecommendNutrientDto {

    private int age;

    @NotBlank
    private String gender;

    @NotBlank
    private Boolean pregnant;

    private List<Long> takingNutrientList;

    @NotBlank
    private List<Integer> functionList;

    @NotBlank
    private List<Integer> typeList;

}
