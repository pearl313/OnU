package com.ssafy.onu.dto.response;

import com.ssafy.onu.dto.Gender;
import com.ssafy.onu.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class ResponseUserInfoDto {
    private String userNickname;
    private int userAge;
    private Gender userGender;

    public ResponseUserInfoDto(User user) {
        this.userNickname = user.getUserNickname();
        this.userAge = LocalDateTime.now().getYear() - user.getUserAge() + 1;
        this.userGender = user.getUserGender();
    }
}
