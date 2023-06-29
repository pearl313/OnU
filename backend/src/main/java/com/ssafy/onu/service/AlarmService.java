package com.ssafy.onu.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.onu.dto.AlarmMessageDto;
import com.ssafy.onu.dto.request.ReqAlarmDto;
import com.ssafy.onu.dto.response.ResponseAlarmDto;
import com.ssafy.onu.entity.Alarm;
import com.ssafy.onu.entity.User;
import com.ssafy.onu.repository.AlarmRepository;
import com.ssafy.onu.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AlarmService {
    private final String EMPTY = "";
    private final String MINUS = "-";
    private final String MYPAGE_URL = "https://o-nu.com/mypage";
    private final String SUCCESS = "202";

    private final AlarmRepository alarmRepository;
    private final UserRepository userRepository;
    private final RestTemplate restTemplate;
    @Value("${naver.cloud.sms.accessKey}")
    private String accessKey;

    @Value("${naver.cloud.sms.secretKey}")
    private String secretKey;

    @Value("${naver.cloud.sms.serviceId}")
    private String serviceId;

    @Value("${naver.cloud.sms.senderPhone}")
    private String phone;

    public boolean createAlarm(int userId, String alarmTime) throws UnsupportedEncodingException, NoSuchAlgorithmException, URISyntaxException, InvalidKeyException, JsonProcessingException {
        Optional<User> findUser = userRepository.findByUserId(userId);
        if(!findUser.isPresent()) return Boolean.FALSE;
        String clientPhone = findUser.get().getUserAuthId().getUserPhoneNumber().replaceAll(MINUS, EMPTY);
        if(clientPhone == null || clientPhone.equals(EMPTY)) return Boolean.FALSE;
        Optional<Alarm> findAlarm = alarmRepository.findByAlarmUserId_UserId(userId);
        // 메세지 내용 작성
        AlarmMessageDto alarmMessageDto = new AlarmMessageDto(clientPhone, makeMessageContent(findUser.get()));
        String scheduleCode = makeScheduleTime(alarmTime);

        //알림이 존재한다면 요청아이디 변경
        if(findAlarm.isPresent()){
            //기존 스케쥴된 것 삭제
            try{
                //네이버 API 호출
                ResponseAlarmDto responseAlarmDto = sendSms(alarmMessageDto, scheduleCode);
                //네이버 API 호출 실패시
                if(!responseAlarmDto.getStatusCode().equals(SUCCESS)) return Boolean.FALSE;
                if(findAlarm.get().getAlarmRequestId() != null){
                    removeSms(findAlarm.get().getAlarmScheduleCode(), findAlarm.get().getAlarmRequestId());
                }
                findAlarm.get().changeInfo(responseAlarmDto.getRequestId(),scheduleCode);
                alarmRepository.save(findAlarm.get());
            }catch (RestClientException e){
                return Boolean.FALSE;
            }
            //새로 스케쥴링
        }
        //알림이 존재하지 않는다면 새로 등록
        else {
            //네이버 API 호출
            ResponseAlarmDto responseAlarmDto = sendSms(alarmMessageDto, scheduleCode);
            //네이버 API 호출 실패시
            if(!responseAlarmDto.getStatusCode().equals(SUCCESS)) return Boolean.FALSE;
            alarmRepository.save(new Alarm(findUser.get(), responseAlarmDto.getRequestId(), scheduleCode));
        }
        return Boolean.TRUE;
    }
    public boolean deleteAlarm(int userId) throws UnsupportedEncodingException, NoSuchAlgorithmException, URISyntaxException, InvalidKeyException{
        Optional<Alarm> findAlarm = alarmRepository.findByAlarmUserId_UserId(userId);
        if(!findAlarm.isPresent()) return Boolean.FALSE;
        removeSms(findAlarm.get().getAlarmScheduleCode(), findAlarm.get().getAlarmRequestId());
        findAlarm.get().changeInfo(null, null);
        alarmRepository.save(findAlarm.get());
        return Boolean.TRUE;
    }
    public String makeScheduleTime(String alarmTime){
        String[] alarm = alarmTime.split(":");
        StringBuilder sb = new StringBuilder("every-");
        sb.append(Integer.parseInt(alarm[0]) >= 12 ? "pm" : "am");

        return sb.append("-").append(alarm[0]).append("-").append(alarm[1]).toString();
    }
    public String makeMessageContent(User user){
        StringBuilder content = new StringBuilder().append("[OnU]").append("\n")
                .append("띵동~ ").append(user.getUserNickname()).append("님 오늘 하루 영양제 복용하셨나요? 잊으셨다면 아래 링크를 눌러 영양제 캘린더 등록을 눌러주세요 ")
                .append("저희 OnU는 항상 ").append(user.getUserNickname()).append("님의 꾸준한 영양제 복용을 위해 노력하겠습니다:)\n\n")
                .append("OnU 사이트 바로가기\n")
                .append(MYPAGE_URL);
        return content.toString();
    }

    public String makePostSignature(Long time) throws UnsupportedEncodingException, NoSuchAlgorithmException, InvalidKeyException {
        String method = "POST";
        String url = "/sms/v2/services/"+ this.serviceId+"/messages";
        return getEncodingSignature(time, method, url);
    }

    public String makeDeleteSignature(Long time, String scheduleCode, String requestId) throws UnsupportedEncodingException, NoSuchAlgorithmException, InvalidKeyException {
        String method = "DELETE";
        String url = "/sms/v2/services/"+ serviceId + "/schedules/" + scheduleCode + "/messages/" + requestId;
        return getEncodingSignature(time, method, url);
    }

    private String getEncodingSignature(Long time, String method, String url) throws UnsupportedEncodingException, NoSuchAlgorithmException, InvalidKeyException {
        String space = " ";
        String newLine = "\n";
        String timestamp = time.toString();
        String accessKey = this.accessKey;
        String secretKey = this.secretKey;

        String message = new StringBuilder()
                .append(method)
                .append(space)
                .append(url)
                .append(newLine)
                .append(timestamp)
                .append(newLine)
                .append(accessKey)
                .toString();

        SecretKeySpec signingKey = new SecretKeySpec(secretKey.getBytes("UTF-8"), "HmacSHA256");
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(signingKey);

        byte[] rawHmac = mac.doFinal(message.getBytes("UTF-8"));
        String encodeBase64String = Base64.encodeBase64String(rawHmac);

        return encodeBase64String;
    }

    //스케쥴 등록 및 응답 반환
    public ResponseAlarmDto sendSms(AlarmMessageDto alarmMessageDto, String scheduleTime) throws InvalidKeyException, NoSuchAlgorithmException, UnsupportedEncodingException, JsonProcessingException, URISyntaxException {
        Long time = System.currentTimeMillis();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-ncp-apigw-timestamp", time.toString());
        headers.set("x-ncp-iam-access-key", accessKey);
        headers.set("x-ncp-apigw-signature-v2", makePostSignature(time));

        List<AlarmMessageDto> messages = new ArrayList<>();
        messages.add(alarmMessageDto);
        ReqAlarmDto request = ReqAlarmDto.builder()
                .scheduleCode(scheduleTime)
                .from(phone)
                .content(alarmMessageDto.getContent())
                .messages(messages)
                .build();

        ObjectMapper objectMapper = new ObjectMapper();
        String body = objectMapper.writeValueAsString(request);
        HttpEntity<String> httpBody = new HttpEntity<>(body, headers);

        restTemplate.setRequestFactory(new HttpComponentsClientHttpRequestFactory());
        ResponseAlarmDto response = restTemplate.postForObject(new URI("https://sens.apigw.ntruss.com/sms/v2/services/"+ serviceId +"/messages"), httpBody, ResponseAlarmDto.class);

        return response;
    }

    // 스케쥴 메세지 삭제
    public void removeSms(String scheduleCode, String requestId) throws URISyntaxException, RestClientException, UnsupportedEncodingException, NoSuchAlgorithmException, InvalidKeyException {
        Long time = System.currentTimeMillis();

        HttpHeaders headers = new HttpHeaders();
        headers.set("x-ncp-apigw-timestamp", time.toString());
        headers.set("x-ncp-iam-access-key", accessKey);
        headers.set("x-ncp-apigw-signature-v2", makeDeleteSignature(time, scheduleCode, requestId));

        HttpEntity<String> request = new HttpEntity<>(headers);

        restTemplate.setRequestFactory(new HttpComponentsClientHttpRequestFactory());
        restTemplate.exchange(new URI("https://sens.apigw.ntruss.com/sms/v2/services/"+ serviceId
                + "/schedules/" + scheduleCode + "/messages/" + requestId), HttpMethod.DELETE, request, String.class);
    }
}
