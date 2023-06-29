package com.ssafy.onu.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.onu.dto.request.ReqAlarmTimeDto;
import com.ssafy.onu.dto.response.ResponseNutrientDetailDto;
import com.ssafy.onu.service.AlarmService;
import com.ssafy.onu.util.TokenUtils;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/notification")
@RequiredArgsConstructor
public class AlarmController {
    private static final String MESSAGE = "message";
    private static final String RESULT = "result";
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    private final AlarmService alarmService;

    @ApiOperation(value = "알림 등록한다.", notes = "사용자는 알림 등록을 한다.", response = Map.class)
    @PostMapping("/{userId}")
    public ResponseEntity<Map<String, Object>> createAlarm(@PathVariable int userId, @RequestBody ReqAlarmTimeDto reqAlarmTimeDto,
                                                           Principal principal){
        Map<String, Object> resultMap = new HashMap<>();

        // PathVariable로 받은 userId와 토큰에 있는 userId 비교
        if(userId > 0 && TokenUtils.compareUserIdAndToken(userId, principal, resultMap)) {
            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
        }

        try {
            if(alarmService.createAlarm(userId, reqAlarmTimeDto.getTime())) {
                resultMap.put(MESSAGE, SUCCESS);
                return new ResponseEntity<>(resultMap, HttpStatus.OK);
            } else {
                resultMap.put(MESSAGE, FAIL);
                return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            resultMap.put(MESSAGE, FAIL);
            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
        }
    }
    @ApiOperation(value = "등록한 알림을 삭제한다.", notes = "사용자는 등록한 알림을 삭제한다.", response = Map.class)
    @DeleteMapping("/{userId}")
    public ResponseEntity<Map<String, Object>> deleteAlarm(@PathVariable int userId, Principal principal){
        Map<String, Object> resultMap = new HashMap<>();

        // PathVariable로 받은 userId와 토큰에 있는 userId 비교
        if(userId > 0 && TokenUtils.compareUserIdAndToken(userId, principal, resultMap)) {
            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
        }

        try {
            if(alarmService.deleteAlarm(userId)) {
                resultMap.put(MESSAGE, SUCCESS);
                return new ResponseEntity<>(resultMap, HttpStatus.OK);
            } else {
                resultMap.put(MESSAGE, FAIL);
                return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            resultMap.put(MESSAGE, FAIL);
            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
        }
    }
}
