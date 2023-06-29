package com.ssafy.onu.service;

import com.ssafy.onu.dto.response.ResponseSurveyInfoDto;
import com.ssafy.onu.repository.SurveyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SurveyService {
    private final SurveyRepository surveyRepository;
    public List<ResponseSurveyInfoDto> getQuestion() {
        return surveyRepository.findAll().stream().map(survey -> new ResponseSurveyInfoDto(survey)).collect(Collectors.toList());
    }
}
