package com.ssafy.onu.dto.user;

import com.ssafy.onu.dto.AuthProvider;
import com.ssafy.onu.exception.OAuth2AuthenticationProcessingException;

import java.util.Map;


// 어떤 소셜로그인 사용자인지 확인
public class OAuth2UserInfoFactory {

    public static OAuth2UserInfoDto getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {
        if (registrationId.equalsIgnoreCase(AuthProvider.kakao.toString())) {
            return new KakaoUserInfoDto(attributes);
        } else {
            throw new OAuth2AuthenticationProcessingException("Sorry! Login with " + registrationId + " is not supported yet.");
        }
    }
}
