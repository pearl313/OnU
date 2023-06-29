package com.ssafy.onu.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseMyReviewDto {
    private int reviewId;
    private long nutrientId;
    private String nutrientName;
    private  String nutrientImageUrl;
    private  String nutrientBrand;
    private String reviewContent;
    private int reviewScore;

}
