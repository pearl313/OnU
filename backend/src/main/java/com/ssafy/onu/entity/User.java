package com.ssafy.onu.entity;

import com.ssafy.onu.dto.AuthProvider;
import com.ssafy.onu.dto.Gender;
import com.ssafy.onu.dto.request.ReqUserInfoDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@DynamicInsert
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user")
public class User extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;

    @Column
    private int userAge;

    @Enumerated(EnumType.STRING)
    @Column(length = 6)
    private Gender userGender;

    @Column(length = 50)
    private String userNickname;

    @Column(length = 1)
    private String userPhoneCheckYn;

    @OneToOne(fetch = FetchType.LAZY, cascade=CascadeType.ALL)
    @JoinColumn(name = "user_auth_id")
    private Auth userAuthId;


    @Builder
    public User(String userNickname, AuthProvider userProvider, String userProviderId){
        this.userNickname = userNickname;
        this.userAuthId = Auth.builder()
                .userProvider(userProvider)
                .userProviderId(userProviderId)
                .build();
    }

    public void changeNickname(String nickname) {
        this.userNickname = nickname;
    }

    public void createUserInfo(ReqUserInfoDto reqUserInfoDto){
        this.userNickname = reqUserInfoDto.getUserNickname();
        this.userAge = reqUserInfoDto.getUserAge().getYear();
        this.userGender = Gender.valueOf(reqUserInfoDto.getUserGender());
    }

    public void deleteUser() {
        changeNickname("(알 수 없음)");
        this.userAuthId.changeProviderId("del");
    }

    public void updateUserInfo(ReqUserInfoDto reqUserInfoDto){
        this.userNickname = reqUserInfoDto.getUserNickname();
        this.userGender = Gender.valueOf(reqUserInfoDto.getUserGender());
    }

    public void checkPhoneCheckYn() {
        this.userPhoneCheckYn = "Y";
    }
}
