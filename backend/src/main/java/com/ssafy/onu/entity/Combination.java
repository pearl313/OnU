package com.ssafy.onu.entity;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "combination")
public class Combination {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int combinationId;

    @Column
    private int combinationUserId;

    @Column
    private String combinationNutrientList;

    @Builder
    public Combination(int userId, String nutrientList){
        this.combinationUserId = userId;
        this.combinationNutrientList = nutrientList;
    }
}
