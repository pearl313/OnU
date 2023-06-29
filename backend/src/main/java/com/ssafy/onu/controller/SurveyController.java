package com.ssafy.onu.controller;

import com.ssafy.onu.dto.request.ReqReviewCreateFormDto;
import com.ssafy.onu.dto.response.ResponseReviewDto;
import com.ssafy.onu.dto.response.ResponseSurveyInfoDto;
import com.ssafy.onu.service.SurveyService;
import com.ssafy.onu.util.TokenUtils;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/survey")
@RequiredArgsConstructor
public class SurveyController {
    private static final String MESSAGE = "message";
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    private final SurveyService surveyService;
    @ApiOperation(value = "설문 목록 조회", notes = "설문 질문 목록을 조회한다.", response = Map.class)
    @GetMapping()
    public ResponseEntity<Map<String, Object>> getQuestion() {
        Map<String, Object> resultMap = new HashMap<>();

        List<ResponseSurveyInfoDto> questionList = surveyService.getQuestion();

        if (questionList != null) {
            resultMap.put(MESSAGE, SUCCESS);
            resultMap.put("questionList", questionList);
            return new ResponseEntity<>(resultMap, HttpStatus.OK);
        } else {
            resultMap.put(MESSAGE, FAIL);
            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
        }
    }
}
