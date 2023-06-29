package com.ssafy.onu.controller;

import com.ssafy.onu.dto.request.ReqRecommendNutrientDto;
import com.ssafy.onu.dto.response.ResponseRecommendDto;
import com.ssafy.onu.dto.response.ResponseRecommendNutrientDto;
import com.ssafy.onu.service.RecommendService;
import com.ssafy.onu.util.TokenUtils;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/recommend")
@RequiredArgsConstructor
public class RecommendController {

    private static final String MESSAGE = "message";
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final RecommendService recommendService;

    @ApiOperation(value = "회원 맞춤형 영양제 추천", notes = "현재 로그인한 사용자에게 맞는 영양제를 추천한다.", response = Map.class)
    @PostMapping("/{userId}")
    public ResponseEntity<Map<String, Object>> getRecommendNutrient(@PathVariable @ApiParam(value = "회원 아이디", required = true, example = "0") int userId, Principal principal,
                                                                    @ApiParam(value = "설문 결과") @RequestBody ReqRecommendNutrientDto reqRecommendNutrientDto) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        // PathVariable로 받은 userId와 토큰에 있는 userId 비교
        if (TokenUtils.compareUserIdAndToken(userId, principal, resultMap)) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(resultMap, status);
        }

        List<ResponseRecommendDto> responseRecommendNutrientDtoList = recommendService.nutrientFiltering(reqRecommendNutrientDto, userId);


        resultMap.put("nutrientFiltering", responseRecommendNutrientDtoList);


        resultMap.put(MESSAGE, SUCCESS);
        status = HttpStatus.OK;
        return new ResponseEntity<>(resultMap, status);
    }
}
