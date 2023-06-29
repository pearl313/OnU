package com.ssafy.onu.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
public class TakingNutrient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int takingNutrientId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nutrient_id")
    private Nutrient nutrient;

    @Builder
    public TakingNutrient(int takingNutrientId, User user, Nutrient nutrient) {
        this.takingNutrientId = takingNutrientId;
        this.user = user;
        this.nutrient = nutrient;
    }
}
