package com.ssafy.onu.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
public class ResponseAlarmDto {
    String requestId;
    LocalDateTime requestTime;
    String statusCode;
    String statusName;
}
