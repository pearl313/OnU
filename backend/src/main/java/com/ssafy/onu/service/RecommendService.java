package com.ssafy.onu.service;

import com.google.common.collect.Sets;
import com.ssafy.onu.dto.request.ReqForRecommend;
import com.ssafy.onu.dto.request.ReqRecommendNutrientDto;
import com.ssafy.onu.dto.response.ResponseNutrientIngredientDto;
import com.ssafy.onu.dto.response.ResponseNutrientIngredientInfoDto;
import com.ssafy.onu.dto.response.ResponseRecommendDto;
import com.ssafy.onu.dto.response.ResponseRecommendNutrientDto;
import com.ssafy.onu.entity.InterestNutrient;
import com.ssafy.onu.repository.InterestNutrientRepository;
import com.ssafy.onu.repository.NutrientFunctionRepository;
import com.ssafy.onu.repository.NutrientIngredientRepository;
import com.ssafy.onu.repository.NutrientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecommendService {

    private final NutrientRepository nutrientRepository;
    private final NutrientFunctionRepository nutrientFunctionRepository;
    private final NutrientIngredientRepository nutrientIngredientRepository;
    private final InterestNutrientRepository interestNutrientRepository;
    private final RestTemplate restTemplate;
    private final RedisUtil redisUtil;
    private static final String DJANGO = "http://k8a703.p.ssafy.io:8000/recommend_nutrients/";
    private static final String NUTRIENT_ID = "nutrientId:";
    private static final boolean TRUE = true;
    private static final boolean FALSE = false;
    private static final int MIN_RECOMMEND_SIZE = 1;
    private static final int MAX_RECOMMEND_SIZE = 3;

    public List<ResponseRecommendDto> nutrientFiltering(ReqRecommendNutrientDto reqRecommendNutrientDto, int userId){
        boolean[] age = reqRecommendNutrientDto.getAge() > 12 ? new boolean[] {TRUE, FALSE} : new boolean[]{FALSE};
        boolean[] pregnant = reqRecommendNutrientDto.getPregnant() == TRUE ? new boolean[]{FALSE} : new boolean[] {TRUE, FALSE};

        //설문에서 선택한 기능 기준 필터링
        List<Long> funtionList = nutrientFunctionRepository.findByFunction_FunctionIdIn(reqRecommendNutrientDto.getFunctionList())
                .stream().map(nutrientFunction -> nutrientFunction.getNutrient().getNutrientId()).collect(Collectors.toList());
        HashSet<Long> functionNutrientSet = Sets.newHashSet(funtionList);

        HashSet<Long> filteringNutrientSet = new HashSet<>();
        HashSet<Long> filterAndRecommend = new HashSet<>();
        LinkedList<Long> resultSet = new LinkedList<>();
        List<ResponseRecommendNutrientDto> filtering = new LinkedList<>();
        List<ResponseRecommendNutrientDto> result = new LinkedList<>();
        HashMap<String, LinkedList<ResponseRecommendNutrientDto>> responseResult = new HashMap<>();
        List<ResponseRecommendDto> responRecommentList = new LinkedList<>();
        //사용자 기본 정보로 영양제 필터링 + 기능 기준 필터링
        if(!functionNutrientSet.isEmpty()) {
            nutrientRepository.findByNutrientTypeId_NutrientTypeIdInAndNutrientChildInAndNutrientPregnantIn(reqRecommendNutrientDto.getTypeList()
                    , age, pregnant).stream().forEach(nutrient -> {
                if(functionNutrientSet.contains(nutrient.getNutrientId())) {
                    filteringNutrientSet.add(nutrient.getNutrientId());
                    filtering.add(new ResponseRecommendNutrientDto(nutrient));
                }
            });
        }
        //설문 조사 결과 만족하는 맞춤 영양제가 없다면 빈 응답 반환
        if(filteringNutrientSet.isEmpty() || functionNutrientSet.isEmpty()) return responRecommentList;

        //장고 추천 api 호출 -> 필터링되어 나온 영양제 && 추천 영양제
        getRecommend(reqRecommendNutrientDto.getTakingNutrientList(), userId).forEach(nutrientId ->{
            if(filteringNutrientSet.contains(nutrientId)) filterAndRecommend.add(nutrientId);
        });

        if(filterAndRecommend.size() >= MIN_RECOMMEND_SIZE){
            for(ResponseRecommendNutrientDto recommendInfo : filtering){
                if(result.size() == MAX_RECOMMEND_SIZE) break;
                if(filterAndRecommend.contains(recommendInfo.getNutrientId())) {
                    filteringNutrientSet.remove(recommendInfo.getNutrientId());
                    resultSet.add(recommendInfo.getNutrientId());
                    result.add(recommendInfo);
                }
            }
        }
        if(result.size() != MAX_RECOMMEND_SIZE){
            Random rand = new Random();
            while (!filteringNutrientSet.isEmpty()){
                if(result.size() == MAX_RECOMMEND_SIZE) break;
                int idx = rand.nextInt(filtering.size());
                ResponseRecommendNutrientDto tmp = filtering.get(idx);
                if(filteringNutrientSet.contains(tmp.getNutrientId())){
                    result.add(tmp);
                    resultSet.add(tmp.getNutrientId());
                    filteringNutrientSet.remove(tmp.getNutrientId());
                }
            }
        }
        Set<Long> interestNutrientList = interestNutrientRepository.findByUser_UserIdAndNutrient_NutrientIdIn(userId, resultSet).stream()
                .map(interestNutrient -> interestNutrient.getNutrient().getNutrientId()).collect(Collectors.toSet());
        // result -> 반복문 돌기
        // 아이디 가져와서 성분 가져오기
        // 한 영양제마다 HashMap<String(영양제 성분), ResponseRecommendNutrientDto : 영양제 정보(영양제 아이디, 브랜드,..)>
        for(ResponseRecommendNutrientDto responseRecommendNutrient : result){
            if(interestNutrientList.contains(responseRecommendNutrient.getNutrientId())){
                responseRecommendNutrient.setInterest(TRUE);
            }
            getNutrientIngredientInfo(responseRecommendNutrient.getNutrientId()).stream()
                    .forEach(ingredient->{
                        if(!responseResult.containsKey(ingredient)){
                            LinkedList<ResponseRecommendNutrientDto> nutrientInfo = new LinkedList<>();
                            responseResult.put(ingredient, nutrientInfo);
                        }
                        responseResult.get(ingredient).add(responseRecommendNutrient);
                    });
        }
        for(String key : responseResult.keySet()){
            responRecommentList.add(new ResponseRecommendDto(key, responseResult.get(key)));
        }
        return responRecommentList;
    }
    public List<Long> getRecommend(List<Long> takingNutrientList, int userId) {
        ReqForRecommend requestDto = new ReqForRecommend(takingNutrientList, userId);

        return restTemplate.postForObject(DJANGO, requestDto, LinkedList.class);
    }

    public List<String> getNutrientIngredientInfo(Long nutrientId){
        List<String> nutrientIngredientInfoList = new LinkedList<>();
        String nID = NUTRIENT_ID + nutrientId;
        //캐싱되어 있다면
        if(redisUtil.hasNutrient(nID, nID)) {
            for(Object key : redisUtil.getKeys(nID)){
                if(!key.toString().equals(nID) && !key.toString().equals("function")) {
                    nutrientIngredientInfoList.add(key.toString());
                }
            }
        } else {
            Map<String, Object> map = new HashMap<>();
            map.put(nID, nID);
            nutrientIngredientRepository.findNutrientIngredientsByNutrient_NutrientId(nutrientId)
                    .stream()
                    .forEach(nutrientIngredient -> {
                        map.put(nutrientIngredient.getIngredient().getIngredientName(), nutrientIngredient.getIngredientAmount());
                        nutrientIngredientInfoList.add(nutrientIngredient.getIngredient().getIngredientName());
                    });
            redisUtil.cacheNutrient(nID, map);
        }
        return nutrientIngredientInfoList;
    }
}
