package com.ssafy.onu.controller;

import com.ssafy.onu.dto.PhoneAuthDto;
import com.ssafy.onu.dto.request.ReqUserInfoDto;
import com.ssafy.onu.dto.response.ResponseUserInfoDto;
import com.ssafy.onu.service.SmsService;
import com.ssafy.onu.service.TokenProviderService;
import com.ssafy.onu.service.UserService;
import com.ssafy.onu.util.TokenUtils;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private static final String MESSAGE = "message";
    private static final String RESULT = "result";
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final RedisTemplate redisTemplate;
    private final UserService userService;
    private final TokenProviderService tokenProviderService;

    private final SmsService smsService;

    @ApiOperation(value = "닉네임 중복 검사", notes = "회원의 닉네임의 중복 여부를 검사합나다.", response = Map.class)
    @GetMapping("/{userNickname}")
    public ResponseEntity<Map<String,Object>> nicknameDpcn(@ApiParam(value = "닉네임", required = true, example = "홍길동")
                                                           @PathVariable String userNickname){
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        if(userService.nicknameDpcn(userNickname)){
            resultMap.put(MESSAGE , SUCCESS);
            status = HttpStatus.OK;
        } else {
            resultMap.put(MESSAGE, FAIL);
            status = HttpStatus.BAD_REQUEST;
        }

        return new ResponseEntity<>(resultMap, status);
    }

    @ApiOperation(value = "회원의 정보를 등록", notes = "회원의 정보를 등록한다(닉네임, 성별, 나이)", response = Map.class)
    @PostMapping("/{userId}")
    public ResponseEntity<Map<String,Object>> createUserInfo(@ApiParam(value = "등록할 회원정보(아이디)", required = true, example = "1") @PathVariable int userId,
                                                             @ApiParam(value = "등록할 회원정보(닉네임, 성별, 나이)", required = true, example  = "홍동길") @Valid @RequestBody ReqUserInfoDto reqUserInfoDto, Principal principal){
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        if(TokenUtils.compareUserIdAndToken(userId, principal,resultMap)) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(resultMap, status);
        }

        ResponseUserInfoDto userInfo = userService.createUserInfo(userId, reqUserInfoDto);

        if(userInfo == null){
            resultMap.put(MESSAGE, FAIL);
            status = HttpStatus.BAD_REQUEST;
        } else {
            resultMap.put(MESSAGE, SUCCESS);
            resultMap.put("userInfo", userInfo);
            status = HttpStatus.OK;
        }
        return new ResponseEntity<>(resultMap, status);
    }

    @ApiOperation(value = "회원 탈퇴", notes = "회원을 탈퇴시킨다.", response = Map.class)
    @DeleteMapping("/{userId}")
    public ResponseEntity<Map<String,Object>> userDelete(@ApiParam(value = "탈퇴시킬 회원 아이디", required = true, example = "1") @PathVariable int userId
            , Principal principal, HttpServletRequest request){
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        if(TokenUtils.compareUserIdAndToken(userId, principal,resultMap)) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(resultMap, status);
        }

        if(!userService.userDelete(userId)){
            resultMap.put(MESSAGE, FAIL);
            status = HttpStatus.BAD_REQUEST;
        } else {
            return logout(userId, principal, request);
        }
        return new ResponseEntity<>(resultMap, status);
    }

    @ApiOperation(value = "로그아웃", notes = "로그아웃 시킨다.", response = Map.class)
    @GetMapping("/logout/{userId}")
    public ResponseEntity<Map<String,Object>> logout(@ApiParam(value = "로그아웃 시킬 회원 아이디", required = true, example = "1") @PathVariable int userId, Principal principal, HttpServletRequest request) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        if(TokenUtils.compareUserIdAndToken(userId, principal,resultMap)) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(resultMap, status);
        }

        if (redisTemplate.opsForValue().get("RT:" + principal.getName()) != null) {
            redisTemplate.delete("RT:" + principal.getName());
        }

        String accessToken = TokenUtils.getJwtFromRequest(request);

        Long expiration = tokenProviderService.getExpiration(accessToken);
        redisTemplate.opsForValue()
                .set(accessToken, "logout", expiration, TimeUnit.MILLISECONDS);

        resultMap.put(MESSAGE, SUCCESS);
        status = HttpStatus.OK;

        return new ResponseEntity<>(resultMap, status);
    }

    @ApiOperation(value = "인증번호 전송", notes = "휴대폰 본인인증 인증번호를 전송합니다.", response = Map.class)
    @PostMapping("/sms")
    public ResponseEntity<Map<String, Object>> sendSms(@ApiParam(value = "(null(입력한 인증번호), 휴대폰 번호, 회원 아이디)") @RequestBody PhoneAuthDto phoneAuthDto) {
        Map<String, Object> resultMap = new HashMap<>();

        if(smsService.sendMessage(phoneAuthDto) != null) {
            resultMap.put(MESSAGE, SUCCESS);
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
        } else {
            resultMap.put(MESSAGE, FAIL);
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "인증번호 일치여부 확인", notes = "입력한 인증번호와 발급한 인증번호가 일치하는지 확인하고, 일치하면 번호를 저장합니다.", response = Map.class)
    @PostMapping("/phone")
    public ResponseEntity<Map<String, Object>> checkPhoneAuthCode(@ApiParam(value = "(입력한 인증번호, 휴대폰 번호, 회원 아이디)") @RequestBody PhoneAuthDto phoneAuthDto) {
        Map<String, Object> resultMap = new HashMap<>();

        if(smsService.checkPhoneAuthCode(phoneAuthDto)) {
            resultMap.put(MESSAGE, SUCCESS);
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.OK);
        } else {
            resultMap.put(MESSAGE, FAIL);
            return new ResponseEntity<Map<String, Object>>(resultMap, HttpStatus.BAD_REQUEST);
        }
    }
}
