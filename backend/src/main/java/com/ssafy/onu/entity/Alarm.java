package com.ssafy.onu.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "alarm")
public class Alarm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int alarmId;

    @OneToOne(fetch = FetchType.LAZY, cascade=CascadeType.ALL)
    @JoinColumn(name = "alarm_user_id")
    private User alarmUserId;
    @Column
    private String alarmRequestId;
    @Column
    private String alarmScheduleCode;

    public Alarm(User alarmUserId, String alarmRequestId, String alarmScheduleCode) {
        this.alarmUserId = alarmUserId;
        this.alarmRequestId = alarmRequestId;
        this.alarmScheduleCode = alarmScheduleCode;
    }
    public void changeInfo(String alarmRequestId, String alarmScheduleCode){
        this.alarmRequestId = alarmRequestId;
        this.alarmScheduleCode = alarmScheduleCode;
    }
}
