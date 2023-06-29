package com.ssafy.onu.service;

import com.ssafy.onu.dto.PhoneAuthDto;
import com.ssafy.onu.entity.Auth;
import com.ssafy.onu.entity.User;
import com.ssafy.onu.repository.AuthRepository;
import com.ssafy.onu.repository.UserRepository;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;


@Service
public class SmsService {

    @Value(value = "${cool.key}")
    private String smsApiKey;
    @Value("${cool.secret}")
    private String smsApiSecret;
    @Value("${cool.from}")
    private String from;

    private RedisUtil redisUtil;
    private UserRepository userRepository;
    private AuthRepository authRepository;
    private final String PREFIX = "sms_";

    public SmsService(RedisUtil redisUtil, UserRepository userRepository, AuthRepository authRepository) {
        this.redisUtil = redisUtil;
        this.userRepository = userRepository;
        this.authRepository = authRepository;
    }

//    final DefaultMessageService defaultMessageService;

    //문자 전송 메소드

    public SingleMessageSentResponse sendMessage(PhoneAuthDto phoneAuthDto) {
        String phone = phoneAuthDto.getPhone();

        DefaultMessageService defaultMessageService = NurigoApp.INSTANCE.initialize(smsApiKey, smsApiSecret, "https://api.coolsms.co.kr");
        Message message = new Message();
        message.setTo(phone);
        message.setFrom(from);

        String text = this.createMessageText(phone);
        message.setText(text);

        SingleMessageSentResponse response = defaultMessageService.sendOne(new SingleMessageSendingRequest(message));

        return response;
    }

    //SMS 내용 생성 메소드
    public String createMessageText(String phone) {
        String code = this.createRandomNum();  //임시 비밀번호
        redisUtil.setData(PREFIX + phone, code, 10);  //redis 캐시에 담기

        StringBuffer sb = new StringBuffer("OnU 휴대폰 본인인증\n");
        sb.append("본인인증 인증번호: [");
        sb.append(code);
        sb.append("]입니다.");

        return sb.toString();
    }

    //인증번호 생성 메소드
    public String createRandomNum() {
        StringBuffer sb = new StringBuffer();
        Random random = new Random();
        for(int i=0; i<6; i++) {
            sb.append(random.nextInt(9));
        }
        return sb.toString();
    }

    //인증번호 확인 (일치 -> 인가테이블 번호저장)
    public boolean checkPhoneAuthCode(PhoneAuthDto phoneAuthDto) {
        String redisAuthCode = redisUtil.getData(PREFIX + phoneAuthDto.getPhone());

        if(redisAuthCode!=null && redisAuthCode.equals(phoneAuthDto.getAuthCode())) {  //redis 코드랑 입력한 코드 비교
            Optional<User> user = userRepository.findByUserId(phoneAuthDto.getUserId());
            if(user.isPresent()) {
                int authId = user.get().getUserAuthId().getAuthId();
                Optional<Auth> auth = authRepository.findById(authId);
                if(auth.isPresent()) {
                    //인가테이블 번호저장(변경)처리
                    Auth authEntity = auth.get();
                    authEntity.changeUserPhoneNumber(phoneAuthDto.getPhone());
                    authRepository.save(authEntity);

                    //번호인증여부 N -> Y로 바꾸기
                    user.get().checkPhoneCheckYn();
                    userRepository.save(user.get());
                }
            }
            //redis에서 삭제처리
            redisUtil.deleteDate(PREFIX + phoneAuthDto.getPhone());

            return true;
        } else {
            return false;
        }
    }
}
