package com.ssafy.onu.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "continuous")
public class Continuous {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int continuousId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "continuous_user_id")
    private User continuousUserId;

    @Column
    private int continuousCount;

    @Column
    private String continuousLastDate;

    @Builder
    public Continuous(User continuousUserId, int continuousCount, String continuousLastDate) {
        this.continuousUserId = continuousUserId;
        this.continuousCount = continuousCount;
        this.continuousLastDate = continuousLastDate;
    }

    public void changeContinuous(int continuousCount, String continuousLastDate){
        this.continuousCount = continuousCount;
        this.continuousLastDate = continuousLastDate;
    }
}
