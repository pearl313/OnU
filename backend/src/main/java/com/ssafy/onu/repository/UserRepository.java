package com.ssafy.onu.repository;


import com.ssafy.onu.dto.AuthProvider;
import com.ssafy.onu.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUserNickname(String userNickname);
    Optional<User> findByUserId(int userId);

    Optional<User> findByUserAuthId_UserProviderAndUserAuthId_UserProviderId(AuthProvider provider, String providerId);
}
