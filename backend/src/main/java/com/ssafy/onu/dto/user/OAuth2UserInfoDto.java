package com.ssafy.onu.dto.user;

import com.ssafy.onu.entity.User;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;

public interface OAuth2UserInfoDto {
    String getProvider();
    String getProviderId();
    String getNickname();
    User toEntity();
}
