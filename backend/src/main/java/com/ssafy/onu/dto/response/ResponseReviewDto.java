package com.ssafy.onu.dto.response;

import com.ssafy.onu.entity.Nutrient;
import com.ssafy.onu.entity.Review;
import com.ssafy.onu.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
@NoArgsConstructor
public class ResponseReviewDto {
    private final static String GENDER = "male";
    private final static String FEMALE = "여성";
    private final static String MALE = "남성";
    private String userNickname;
    private String nutrientName;
    private String reviewContent;
    private int userAge;
    private String userGender;
    private int reviewScore;
    private LocalDateTime reviewCreateTime;
    private LocalDateTime reviewUpdateTime;

    public ResponseReviewDto(Review review) {
        this.userNickname = review.getUserId().getUserNickname();
        this.nutrientName = review.getNutrientId().getNutrientName();
        this.reviewContent = review.getReviewContent();
        this.userAge = LocalDateTime.now().getYear() - review.getUserId().getUserAge() + 1;
        this.userGender = review.getUserId().getUserGender().toString().equals(GENDER) ? MALE : FEMALE;
        this.reviewScore = review.getReviewScore();
        this.reviewCreateTime = review.getCreatedAt();
        this.reviewUpdateTime = review.getUpdatedAt();
    }

}
