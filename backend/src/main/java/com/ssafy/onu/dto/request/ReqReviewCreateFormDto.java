package com.ssafy.onu.dto.request;

import com.ssafy.onu.entity.Nutrient;
import com.ssafy.onu.entity.Review;
import com.ssafy.onu.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReqReviewCreateFormDto {

    @NotBlank(message = "내용은 필수 입력 값입니다.")
    private String reviewContent;
    @NotBlank(message = "별점은 필수 입력 값입니다.")
    private int reviewScore;

    public Review toEntity(User userId, Nutrient nutrientId) {
        return Review.builder()
                .reviewContent(reviewContent)
                .reviewScore(reviewScore)
                .userId(userId)
                .nutrientId(nutrientId)
                .build();
    }
}
