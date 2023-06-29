package com.ssafy.onu.entity;

import com.ssafy.onu.dto.AuthProvider;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@DynamicInsert
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "auth")
public class Auth {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int authId;

    @Column
    private String userPhoneNumber;

    @Enumerated(EnumType.STRING)
    @Column(length = 6)
    @NotNull
    private AuthProvider userProvider;

    @Column
    @NotNull
    private String userProviderId;

    @Builder
    public Auth(AuthProvider userProvider, String userProviderId){
        this.userProvider = userProvider;
        this.userProviderId = userProviderId;
    }

    public void changeProviderId(String userProviderId) {
        this.userProviderId = userProviderId;
    }

    public void changeUserPhoneNumber(String userPhoneNumber) {  //번호인증완료 시 전화번호 저장하기 위한 메소드
        this.userPhoneNumber = userPhoneNumber;
    }
}
