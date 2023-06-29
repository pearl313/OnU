package com.ssafy.onu.dto.request;

import lombok.Getter;

import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
public class ReqAlarmTimeDto {
    @NotNull(message = "알림 시간 정보는 필수 값입니다.")
    private String time;
}
