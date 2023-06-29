package com.ssafy.onu.entity;

import com.ssafy.onu.dto.request.ReqReviewCreateFormDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Builder
@AllArgsConstructor
@Table(name = "review")
public class Review extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reviewId;

    @Column
    private String reviewContent;

    @Column
    private int reviewScore;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User userId;

    @ManyToOne
    @JoinColumn(name = "nutrient_id")
    private Nutrient nutrientId;

    public Review() {

    }

    public void editReview(ReqReviewCreateFormDto reqReviewCreateFormDto){
        this.reviewContent = reqReviewCreateFormDto.getReviewContent();
        this.reviewScore = reqReviewCreateFormDto.getReviewScore();
    }
}
