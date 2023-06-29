package com.ssafy.onu.dto.request;

import com.ssafy.onu.dto.AlarmMessageDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@Getter
public class ReqAlarmDto {
    String scheduleCode;
    String type;
    String contentType;
    String countryCode;
    String from;
    String content;
    List<AlarmMessageDto> messages;

    @Builder
    public ReqAlarmDto(String scheduleCode, String from, String content, List<AlarmMessageDto> messages) {
        this.scheduleCode = scheduleCode;
        this.type = "MMS";
        this.contentType = "COMM";
        this.countryCode = "82";
        this.from = from;
        this.content = content;
        this.messages = messages;
    }
}
