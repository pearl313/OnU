package com.ssafy.onu.service;

import com.ssafy.onu.entity.InterestNutrient;
import com.ssafy.onu.entity.Nutrient;
import com.ssafy.onu.entity.User;
import com.ssafy.onu.repository.InterestNutrientRepository;
import com.ssafy.onu.repository.NutrientRepository;
import com.ssafy.onu.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class InterestNutrientService {

    private final UserRepository userRepository;
    private final NutrientRepository nutrientRepository;
    private final InterestNutrientRepository interestNutrientRepository;

    public boolean creatInterestNutrient(int userId, Long nutrientId) {
        Optional<User> user = userRepository.findByUserId(userId);
        // 가입한 사람인지 확인
        if (!user.isPresent()) {
            return false;
        }
        // db에 존재하는 제품인지 확인
        Optional<Nutrient> nutrient = nutrientRepository.findByNutrientId(nutrientId);
        if (!nutrient.isPresent()) {
            return false;
        }
        // 이미 등록한 것인지 확인
        Optional<InterestNutrient> interestNutrient = interestNutrientRepository.findByNutrient_NutrientIdAndUser_UserId(nutrientId, userId);
        if (interestNutrient.isPresent()) {
            return false;
        }
        // 새로운 관심 영양제 저장
        interestNutrientRepository.save(new InterestNutrient(user.get(), nutrient.get()));
        return true;
    }
}
