package com.ssafy.onu.dto.response;

import com.ssafy.onu.entity.Survey;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ResponseSurveyInfoDto {
    private int surveyId;
    private String surveyQuestion;

    public ResponseSurveyInfoDto(Survey survey) {
        this.surveyId = survey.getSurveyId();
        this.surveyQuestion = survey.getSurveyQuestion();
    }
}
