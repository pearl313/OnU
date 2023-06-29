package com.ssafy.onu.dto.request;

import lombok.Getter;

import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
public class ReqCombinationDto {
    @NotNull(message = "영양제 정보는 필수 값입니다.")
    private List<Long> nutrientList;
}
