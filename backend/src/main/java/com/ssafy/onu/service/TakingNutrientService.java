package com.ssafy.onu.service;

import com.ssafy.onu.dto.request.ReqTakingNutrientDto;
import com.ssafy.onu.dto.response.ResponseTakingNutrientDto;
import com.ssafy.onu.entity.Nutrient;
import com.ssafy.onu.entity.TakingNutrient;
import com.ssafy.onu.entity.User;
import com.ssafy.onu.repository.NutrientRepository;
import com.ssafy.onu.repository.TakingNutrientRepository;
import com.ssafy.onu.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class TakingNutrientService {
    private final TakingNutrientRepository takingNutrientRepository;
    private final UserRepository userRepository;
    private final NutrientRepository nutrientRepository;

    //복용중인 영양제 등록
    public int createTakingNutrient(int userId, Long nutrientId) {
        Optional<User> user = userRepository.findByUserId(userId);
        Optional<Nutrient> nutrient = nutrientRepository.findByNutrientId(nutrientId);
        if(!user.isPresent()) return 0;
        if(!nutrient.isPresent()) return 0;

        //이미 복용중인 영양제로 등록되어 있는지 체크 (복용중이면 return 2)
        Optional<TakingNutrient> checkTakingNutrient = takingNutrientRepository.findByUserAndNutrient(user.get(), nutrient.get());
        if(checkTakingNutrient.isPresent()) return 2;

        ReqTakingNutrientDto reqTakingNutrientDto = new ReqTakingNutrientDto();
        reqTakingNutrientDto.setNutrient(nutrient.get());
        reqTakingNutrientDto.setUser(user.get());

        TakingNutrient takingNutrient = takingNutrientRepository.save(reqTakingNutrientDto.toEntity());

        if(takingNutrient != null) {
            return 1;
        } else {
            return 0;
        }
    }

    //복용중인 영양제 조회
    public List<ResponseTakingNutrientDto> getTakingNutrientList(int userId) {
        Optional<User> user = userRepository.findByUserId(userId);
        if(!user.isPresent()) return null;

        List<TakingNutrient> takingNutrientList = takingNutrientRepository.findByUser(user.get());
        List<ResponseTakingNutrientDto> takingNutrientDtoList = new ArrayList<>();

        for(TakingNutrient x : takingNutrientList) {
            ResponseTakingNutrientDto takingNutrientDto = new ResponseTakingNutrientDto();
            takingNutrientDto.setNutrientId(x.getNutrient().getNutrientId());
            takingNutrientDto.setNutrientName(x.getNutrient().getNutrientName());
            takingNutrientDto.setNutrientBrand(x.getNutrient().getNutrientBrand());
            takingNutrientDto.setNutrientImageUrl(x.getNutrient().getNutrientImageUrl());

            takingNutrientDtoList.add(takingNutrientDto);
        }

        return takingNutrientDtoList;
    }

    //복용중인 영양제 삭제
    public int deleteTakingNutrient(int userId, Long nutrientId) {
        Optional<User> user = userRepository.findByUserId(userId);
        Optional<Nutrient> nutrient = nutrientRepository.findByNutrientId(nutrientId);
        if(!user.isPresent()) return 0;
        if(!nutrient.isPresent()) return 0;

        //일치하는 복용중인 영양제 id 확인
        Optional<TakingNutrient> takingNutrient = takingNutrientRepository.findByUserAndNutrient(user.get(), nutrient.get());
        if(!takingNutrient.isPresent()) return 0;

        takingNutrientRepository.delete(takingNutrient.get());
        return 1;
    }
}
