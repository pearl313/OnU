package com.ssafy.onu.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Entity
@Getter
@DynamicInsert
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "nutrient")
public class Nutrient {

    @Id
    private Long nutrientId;

    @Column
    private String nutrientName;

    @Column
    private String nutrientImageUrl;

    @Column
    private String nutrientBrand;

    @Column
    private String nutrientIntake;

    @Column
    private String nutrientCaution;

    @Column
    private String nutrientExpiration;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nutrient_type_id")
    private NutrientType nutrientTypeId;

    @Column
    private String nutrientMaterial;

    @Column
    private boolean nutrientPregnant;

    @Column
    private boolean nutrientChild;

    @Column
    private int nutrientGender;
}
