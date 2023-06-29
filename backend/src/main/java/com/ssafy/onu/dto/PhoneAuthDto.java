package com.ssafy.onu.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PhoneAuthDto {
    private int userId;

    private String phone;

    private String authCode;
}
