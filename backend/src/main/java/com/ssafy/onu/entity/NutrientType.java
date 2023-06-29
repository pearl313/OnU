package com.ssafy.onu.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "nutrient_type")
public class NutrientType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int nutrientTypeId;

    @Column
    private String nutrientType;
}
