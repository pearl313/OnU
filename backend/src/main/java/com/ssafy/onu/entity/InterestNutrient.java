package com.ssafy.onu.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "interest_nutrient")
public class InterestNutrient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int interestNutrientId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "nutrient_id")
    private Nutrient nutrient;

    @Builder
    public InterestNutrient(User user, Nutrient nutrient) {
        this.user = user;
        this.nutrient = nutrient;
    }
}
