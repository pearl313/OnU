package com.ssafy.onu.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class AlarmMessageDto {
    String to;
    String content;

    @Builder
    public AlarmMessageDto(String to, String content) {
        this.to = to;
        this.content = content;
    }
}
