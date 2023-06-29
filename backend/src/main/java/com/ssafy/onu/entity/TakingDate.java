package com.ssafy.onu.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "taking_date")
public class TakingDate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "taking_date_id")
    private int takingDateId;

    @Column(name = "taking_date_date")
    private String takingDateDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User userId;
    @Builder
    public TakingDate(String takingDateDate, User userId) {
        this.takingDateDate = takingDateDate;
        this.userId = userId;
    }
}
