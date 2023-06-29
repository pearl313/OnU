package com.ssafy.search.service;

import com.ssafy.search.dto.response.ResponseSearchedNutrientDto;
import com.ssafy.search.entity.Nutrient;
import com.ssafy.search.repository.NutrientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class SearchService {
    private final NutrientRepository nutrientRepository;

    public List<ResponseSearchedNutrientDto> searchNutrient(String keyword) {
        List<ResponseSearchedNutrientDto> resultList = new ArrayList<>();

        List<Nutrient> nutrientList = nutrientRepository.searchNutrient(keyword);
        for(Nutrient x : nutrientList) {
            ResponseSearchedNutrientDto searchedNutrient = new ResponseSearchedNutrientDto();
            searchedNutrient.setNutrientId(x.getNutrientId());
            searchedNutrient.setNutrientName(x.getNutrientName());
            searchedNutrient.setNutrientBrand(x.getNutrientBrand());
            searchedNutrient.setNutrientImageUrl(x.getNutrientImageUrl());

            resultList.add(searchedNutrient);
        }
        return resultList;
    }


}
