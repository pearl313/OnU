package com.ssafy.onu.dto.response;

import lombok.*;

import java.util.Date;
import java.util.List;

@Getter
public class ResponseTakingDateDto {
    private List<String> takingDateDate;
    private int continuousCount;

    public ResponseTakingDateDto(List<String> takingDateDate, int continuousCount) {
        this.takingDateDate = takingDateDate;
        this.continuousCount = continuousCount;
    }
}
