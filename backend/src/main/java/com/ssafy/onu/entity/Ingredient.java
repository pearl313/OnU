package com.ssafy.onu.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "ingredient")
public class Ingredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ingredientId;

    @Column
    private String ingredientName;
    @Column
    private String ingredientRecommendedIntakeStart;
    @Column
    private String ingredientRecommendedIntakeEnd;
}
