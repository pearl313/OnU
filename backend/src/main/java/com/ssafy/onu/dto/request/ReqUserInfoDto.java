package com.ssafy.onu.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import javax.validation.constraints.PastOrPresent;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
public class ReqUserInfoDto {
    @NotNull(message = "닉네임은 필수 입력 값입니다.")
    private String userNickname;


    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @PastOrPresent
    private LocalDate userAge;

    @NotNull(message = "성별은 필수 입력 값입니다.")
    private String userGender;
}
