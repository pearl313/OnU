package com.ssafy.onu.service;

import com.ssafy.onu.dto.response.ResponseNutrientDetailDto;
import com.ssafy.onu.dto.response.ResponseNutrientIngredientInfoDto;
import com.ssafy.onu.dto.response.ResponseNutrientListDto;
import com.ssafy.onu.entity.*;
import com.ssafy.onu.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class NutrientService {

    private static final int ZERO = 0;
    private static final String NUTRIENT_ID = "nutrientId:";
    private static final String INGREDIENT_NAME = "ingredientName:";
    private static final String FUNCTION = "function";
    private static final String COMMA = ",";
    private final RedisUtil redisUtil;
    private final NutrientRepository nutrientRepository;
    private final NutrientIngredientRepository nutrientIngredientRepository;
    private final InterestNutrientRepository interestNutrientRepository;
    private final NutrientFunctionRepository nutrientFunctionRepository;
    private final IngredientRepository ingredientRepository;
    private final NutrientTypeRepository nutrientTypeRepository;

    public List<ResponseNutrientListDto> getNutrientByIngredient(int ingredientId, int userId) {
        List<NutrientIngredient> nutrientIngredientList = nutrientIngredientRepository.findNutrientIngredientByIngredient_IngredientId(ingredientId);
        List<ResponseNutrientListDto> nutrientByIngreidientList = new ArrayList<>();

        List<InterestNutrient> interestNutrientList = new ArrayList<>();
        if(userId > ZERO) interestNutrientList = interestNutrientRepository.findByUser_UserId(userId);

        for (NutrientIngredient nutrientIngredient : nutrientIngredientList) {
            Optional<Nutrient> nutrientOptional = nutrientRepository.findByNutrientId(nutrientIngredient.getNutrient().getNutrientId());

            if(nutrientOptional.isPresent()){
                Nutrient nutrient = nutrientOptional.get();
                ResponseNutrientListDto nutrientByIngreidientDto = new ResponseNutrientListDto(nutrient.getNutrientId(),nutrient.getNutrientName(),nutrient.getNutrientImageUrl(),nutrient.getNutrientBrand());

                boolean isInterested = false;
                for (InterestNutrient interestNutrient : interestNutrientList) {
                    if(interestNutrient.getNutrient().getNutrientId().equals(nutrient.getNutrientId())) isInterested = true;
                }
                nutrientByIngreidientDto.setInterested(isInterested);

                nutrientByIngreidientList.add(nutrientByIngreidientDto);
            }

        }
        return nutrientByIngreidientList;
    }

    public List<ResponseNutrientListDto> getNutrientByFunction(int functionId, int userId) {
        List<NutrientFunction> nutrientFuntionList = nutrientFunctionRepository.findNutrientFuntionByFunction_FunctionId(functionId);
        List<ResponseNutrientListDto> nutrientByIngreidientList = new ArrayList<>();

        List<InterestNutrient> interestNutrientList = new ArrayList<>();
        if(userId > ZERO) interestNutrientList = interestNutrientRepository.findByUser_UserId(userId);

        for (NutrientFunction nutrientFunction : nutrientFuntionList) {

                Nutrient nutrient = nutrientFunction.getNutrient();
                ResponseNutrientListDto nutrientByIngreidientDto = new ResponseNutrientListDto(nutrient.getNutrientId(),nutrient.getNutrientName(),nutrient.getNutrientImageUrl(),nutrient.getNutrientBrand());

                boolean isInterested = false;
                for (InterestNutrient interestNutrient : interestNutrientList) {
                    if(interestNutrient.getNutrient().getNutrientId().equals(nutrient.getNutrientId())) isInterested = true;
                }
                nutrientByIngreidientDto.setInterested(isInterested);

                nutrientByIngreidientList.add(nutrientByIngreidientDto);


        }
        return nutrientByIngreidientList;
    }

    public ResponseNutrientDetailDto getNutrientDetail(long nutrientId, int userId) {
        ResponseNutrientDetailDto nutrientDetail = new ResponseNutrientDetailDto(nutrientId);
        Optional<Nutrient> nutrient = nutrientRepository.findByNutrientId(nutrientId);
        if(nutrient.isPresent()){
            nutrientDetail.setDetail(nutrient.get());
        }else return null;

        //기능 리스트, 성분 리스트
        getNutrientDetailFromCache(nutrientDetail);

        boolean isInterested = false;
        if(interestNutrientRepository.findByUser_UserIdAndNutrient_NutrientId(userId,nutrientId) != null) isInterested = true;

        nutrientDetail.setInterested(isInterested);
        return nutrientDetail;
    }

    public void getNutrientDetailFromCache(ResponseNutrientDetailDto nutrientDetail){
        String nID = NUTRIENT_ID + nutrientDetail.getNutrientId();

        List<ResponseNutrientIngredientInfoDto> nutrientIngredientInfoList = new ArrayList<>();
        List<String> functionList = new ArrayList<>();

        if(redisUtil.hasNutrient(nID,nID)){
            for(Object key : redisUtil.getKeys(nID)){
                if(!key.toString().equals(nID) && !key.toString().equals(FUNCTION)) {
                    // 성분별 함량
                    ResponseNutrientIngredientInfoDto nutrienIngredientInfo = new ResponseNutrientIngredientInfoDto(key.toString(), redisUtil.getNutrientInfo(nID, key.toString()));

                    // 일일 권장량
                    String IID = INGREDIENT_NAME + key;
                    String intake = redisUtil.getIntake(IID);

                    nutrienIngredientInfo.setIntake(intake);
                    nutrientIngredientInfoList.add(nutrienIngredientInfo);
                }
            }

            // 기능
            if(redisUtil.hasNutrient(nID,FUNCTION)){
                String function = redisUtil.getNutrientInfo(nID, String.valueOf(new StringBuilder(FUNCTION)));
                StringTokenizer stringTokenizer = new StringTokenizer(function,COMMA);
                while(stringTokenizer.hasMoreTokens()){
                    functionList.add(stringTokenizer.nextToken());
                }
            }else{
                Map<String,Object> map = redisUtil.getHash(nID);
                functionList = getFuntion(nutrientDetail.getNutrientId(),map, nID);
            }

        } else {
            Map<String, Object> map = new HashMap<>();
            map.put(nID, nID);
            nutrientIngredientRepository.findNutrientIngredientsByNutrient_NutrientId(nutrientDetail.getNutrientId())
                    .stream()
                    .forEach(nutrientIngredient -> {
                        if(nutrientIngredient.getIngredientAmount() != null) {
                            map.put(nutrientIngredient.getIngredient().getIngredientName(), nutrientIngredient.getIngredientAmount());

                            //일일 권장량
                            String IID = INGREDIENT_NAME + nutrientIngredient.getIngredient().getIngredientName();
                            String intake = redisUtil.getIntake(IID);
                            if(intake == null){
                                Ingredient ingredient = ingredientRepository.findByIngredientId(nutrientIngredient.getIngredient().getIngredientId());
                                intake = ingredient.getIngredientRecommendedIntakeStart() + "~" + ingredient.getIngredientRecommendedIntakeEnd();
                                redisUtil.setData(IID,intake);
                            }
                            ResponseNutrientIngredientInfoDto nutrienIngredientInfo = new ResponseNutrientIngredientInfoDto(nutrientIngredient);
                            nutrienIngredientInfo.setIntake(intake);

                            nutrientIngredientInfoList.add(nutrienIngredientInfo);
                        }
                    });

            //기능
            functionList = getFuntion(nutrientDetail.getNutrientId(),map, nID);
        }

        nutrientDetail.setIngredientList(nutrientIngredientInfoList);
        nutrientDetail.setFunctionList(functionList);
    }

    private List<String> getFuntion(long nutrientId, Map<String,Object> map, String nID){
        StringBuilder functionString = new StringBuilder();
        List<String> functionList = new ArrayList<>();

        nutrientFunctionRepository.findNutrientFunctionByNutrient_NutrientId(nutrientId).stream()
                .forEach(nutrientFunction -> {
                    functionString.append(nutrientFunction.getFunction().getFunctionName()).append(COMMA);
                    functionList.add(nutrientFunction.getFunction().getFunctionName());
                });

        functionString.delete(functionString.length()-1, functionString.length());
        map.put(FUNCTION,functionString.toString());

        redisUtil.cacheNutrient(nID, map);

        return functionList;
    }
}
