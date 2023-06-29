package com.ssafy.onu.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class ReqForRecommend {
    private List<Long> takingList;
    private int user;

    public ReqForRecommend(List<Long> takingList, int user) {
        this.takingList = takingList;
        this.user = user;
    }
}
