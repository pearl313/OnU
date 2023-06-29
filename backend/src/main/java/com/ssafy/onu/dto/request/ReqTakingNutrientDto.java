package com.ssafy.onu.dto.request;

import com.ssafy.onu.entity.Nutrient;
import com.ssafy.onu.entity.TakingNutrient;
import com.ssafy.onu.entity.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReqTakingNutrientDto {

    private User user;

    private Nutrient nutrient;

    //toEntity

    public TakingNutrient toEntity() {
        return TakingNutrient.builder()
                .user(user)
                .nutrient(nutrient)
                .build();
    }
}
