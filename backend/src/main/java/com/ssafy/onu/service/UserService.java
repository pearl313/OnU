package com.ssafy.onu.service;

import com.ssafy.onu.dto.request.ReqUserInfoDto;
import com.ssafy.onu.dto.response.ResponseUserInfoDto;
import com.ssafy.onu.entity.User;
import com.ssafy.onu.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    public Boolean nicknameDpcn(String userNickname) {
        Optional<User> user = userRepository.findByUserNickname(userNickname);
        if(user.isPresent()) return false;
        else return true;
    }

    public ResponseUserInfoDto createUserInfo(int userId, ReqUserInfoDto reqUserInfoDto) {
        Optional<User> user = userRepository.findByUserId(userId);
        if(!user.isPresent()){
            return null;
        } else {
            user.get().createUserInfo(reqUserInfoDto);
            return new ResponseUserInfoDto(userRepository.save(user.get()));
        }
    }

    public boolean userDelete(int userId) {
        Optional<User> user = userRepository.findByUserId(userId);
        if(!user.isPresent()) return false;
        else {
            user.get().deleteUser();
            userRepository.save(user.get());
            return true;
        }
    }
}
