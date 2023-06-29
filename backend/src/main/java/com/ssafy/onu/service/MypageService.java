package com.ssafy.onu.service;

import com.ssafy.onu.dto.request.ReqCombinationDto;
import com.ssafy.onu.dto.request.ReqReviewCreateFormDto;
import com.ssafy.onu.dto.request.ReqUserInfoDto;
import com.ssafy.onu.dto.response.*;
import com.ssafy.onu.entity.*;
import com.ssafy.onu.repository.*;
import lombok.*;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MypageService {

    private final UserRepository userRepository;
    private final AlarmRepository alarmRepository;
    private final ReviewRepository reviewRepository;
    private final NutrientIngredientRepository nutrientIngredientRepository;
    private final TakingDateRepository takingDateRepository;
    private final IngredientRepository ingredientRepository;
    private final NutrientRepository nutrientRepository;
    private final ContinuousRepository continuousRepository;
    private final CombinationRepository combinationRepository;
    private final RedisUtil redisUtil;
    private final InterestNutrientRepository interestNutrientRepository;
    private final TakingNutrientRepository takingNutrientRepository;
    private static final String COMMA = ",";
    private static final String EMPTYSTRING = "";
    private static final String TILDE = "~";
    private static final String REGULAR_EXPRESSION_FIND_NUMBER = "[^0-9.]";
    private static final String REGULAR_EXPRESSION_FIND_UNIT = "[0-9.]";
    private static final String NUTRIENT_ID = "nutrientId:";
    private static final String DATE_FORMAT = "yyyy-MM-dd";
    private static final String INGREDIENT_NAME = "ingredientName:";
    private static final int ONE = 1;
    private static final int ZERO = 0;
    private static final int TIMEINDEX = 9;

    // 회원 정보 조회
    public ResponseMypageUserInfoDto getUser(int userId) {
        Optional<User> userData = userRepository.findByUserId(userId);
        Optional<Alarm> alarmData = alarmRepository.findByAlarmUserId_UserId(userId);
        String alarmTime = alarmData.isPresent() ? (alarmData.get().getAlarmRequestId() == null ? EMPTYSTRING : alarmData.get().getAlarmScheduleCode().substring(TIMEINDEX)) : EMPTYSTRING;
        return new ResponseMypageUserInfoDto(userData.get(), alarmTime);
    }

    // 회원 정보 수정
    @Transactional
    public ResponseUserInfoDto updateUserInfo(int userId, ReqUserInfoDto reqUserInfoDto) {
        Optional<User> userData = userRepository.findByUserId(userId);

        if (userData.isPresent()) {
            userData.get().updateUserInfo(reqUserInfoDto);
            return new ResponseUserInfoDto(userRepository.save(userData.get()));
        } else {
            return null;
        }
    }

    // 복용 날짜 조회
    public ResponseTakingDateDto getCheckedDate(int userId, String date) {

        List<String> checkedDate = takingDateRepository.findByUserId_UserIdAndTakingDateDateContains(userId, date).stream()
                .map(d -> d.getTakingDateDate()).collect(Collectors.toList());

        Optional<Continuous> continuous = continuousRepository.findByContinuousUserId_UserId(userId);

        if (continuous.isPresent()) {
            DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern(DATE_FORMAT);
            String lastTakingDate = dateTimeFormatter.format(LocalDateTime.now());

            int betweenDays = (int) Duration.between(LocalDate.parse(continuous.get().getContinuousLastDate(), dateTimeFormatter).atStartOfDay()
                    , LocalDate.parse(lastTakingDate, dateTimeFormatter).atStartOfDay()).toDays();
            if (betweenDays <= ONE) {
                return new ResponseTakingDateDto(checkedDate, continuous.get().getContinuousCount());
            }
        }
        return new ResponseTakingDateDto(checkedDate, ZERO);
    }

    public ResponseReviewDto editReview(ReqReviewCreateFormDto reqReviewCreateFormDto, int reviewId) {
        Optional<Review> review = reviewRepository.findByReviewId(reviewId);
        if(!review.isPresent()) return null;
        review.get().editReview(reqReviewCreateFormDto);
        return new ResponseReviewDto(reviewRepository.save(review.get()));
    }

    public boolean deleteReview(int reviewId) {
        Optional<Review> review = reviewRepository.findByReviewId(reviewId);
        if(!review.isPresent()) return Boolean.FALSE;
        reviewRepository.delete(review.get());
        return Boolean.TRUE;
    }

    @Transactional
    public int checkDate(int userId){
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern(DATE_FORMAT);
        String lastTakingDate =  dateTimeFormatter.format(LocalDateTime.now());

        Optional<User> user = userRepository.findByUserId(userId);
        if(!user.isPresent()) return -1;
        Optional<TakingDate> takingDate = takingDateRepository.findByUserIdAndAndTakingDateDate(user.get(), lastTakingDate);
        if(takingDate.isPresent()) return -1;
        takingDateRepository.save(new TakingDate(lastTakingDate, user.get()));
        Optional<Continuous> continuous = continuousRepository.findByContinuousUserId(user.get());
        if (!continuous.isPresent()){
            return continuousRepository.save(new Continuous(user.get(), ONE, lastTakingDate)).getContinuousCount();
        }
        else{
            int betweenDays = (int) Duration.between(LocalDate.parse(continuous.get().getContinuousLastDate(),dateTimeFormatter).atStartOfDay()
                    , LocalDate.parse(lastTakingDate, dateTimeFormatter).atStartOfDay()).toDays();
            int continuousCount = ONE;
            if(betweenDays == ONE) {
                continuousCount = continuous.get().getContinuousCount() + ONE;
            } else if(betweenDays == ZERO){
                continuousCount = continuous.get().getContinuousCount();
            }
            continuous.get().changeContinuous(continuousCount, lastTakingDate);
            return continuousRepository.save(continuous.get()).getContinuousCount();
        }
    }

    public boolean createCombination(int userId, ReqCombinationDto reqCombinationDto) {
        String combinationList = reqCombinationDto.getNutrientList().stream()
                .map(String::valueOf)
                .collect(Collectors.joining(COMMA));
        if(combinationList.split(COMMA).length == 0) return false;
        combinationRepository.save(new Combination(userId, combinationList));
        return true;
    }

    public boolean deleteCombination(int userId, int combinationId) {
        Optional<Combination> combination = combinationRepository.findByCombinationUserIdAndCombinationId(userId, combinationId);
        if(!combination.isPresent()) return false;
        combinationRepository.delete(combination.get());
        return true;
    }

    public List<ResponseCombinationInfoDto> getCombination(int userId) {
        List<Combination> combinationList = combinationRepository.findCombinationsByCombinationUserId(userId);
        List<ResponseCombinationInfoDto> result = new LinkedList<>();
        combinationList.stream().forEach(combination -> {
            List<Long> nutrients = Arrays.asList(combination.getCombinationNutrientList().split(COMMA))
                    .stream().map(Long::parseLong).collect(Collectors.toList());
            result.add(new ResponseCombinationInfoDto(combination, nutrientRepository.findNutrientsByNutrientIdIn(nutrients).stream()
                    .map(nutrient -> new ResponseCombinationNutrientInfoDto(nutrient)).collect(Collectors.toList())));
        });
        return result;
    }

    public  List<ResponseIngredientTotalDto> getCombinationIngredient(ReqCombinationDto reqCombinationDto) {
        List<ResponseIngredientTotalDto> result = new LinkedList<>();
        HashMap<String, String> ingredientTotal = new HashMap<>();
        HashMap<String, String> ingredientIntake = new HashMap<>();

        reqCombinationDto.getNutrientList().stream().forEach(nutrientId -> {
            getNutrientIngredientTotal(nutrientId, ingredientTotal, ingredientIntake);
        });
        for(String ingredient : ingredientTotal.keySet()){
            String[] ingredientMinMax = ingredientIntake.get(ingredient).split(TILDE);
            result.add(new ResponseIngredientTotalDto(ingredient, ingredientTotal.get(ingredient), Double.parseDouble(ingredientMinMax[0]), Double.parseDouble(ingredientMinMax[1])));
        }
        return result;
    }

    public void getNutrientIngredientTotal(Long nutrientId, HashMap<String, String> ingredientTotal, HashMap<String, String> ingredientIntake){
        HashMap<String, String> nutrientIngredient = new HashMap<>();
        String nID = NUTRIENT_ID + nutrientId;
        //캐싱되어 있다면
        if(redisUtil.hasNutrient(nID, nID)) {
            for(Object key : redisUtil.getKeys(nID)){
                if(!key.toString().equals(nID) && !key.toString().equals("function")) {
                    nutrientIngredient.put(key.toString(), redisUtil.getNutrientInfo(nID, key.toString()));
                    String IID = INGREDIENT_NAME + key.toString();
                    String intake = redisUtil.getIntake(IID);
                    // 권장섭취량 캐싱여부 확인, 캐싱되어 있다면 값 가져와서 사용 캐싱되지 않았다면 권장섭취량 캐싱
                    if(intake == null){
                        Ingredient ingredient = ingredientRepository.findByIngredientName(key.toString());
                        intake = ingredient.getIngredientRecommendedIntakeStart() + TILDE + ingredient.getIngredientRecommendedIntakeEnd();
                        redisUtil.setData(IID,intake);
                    }
                    ingredientIntake.put(key.toString(), intake);
                }
            }
        } else {
            Map<String, Object> map = new HashMap<>();
            map.put(nID, nID);
            nutrientIngredientRepository.findNutrientIngredientsByNutrient_NutrientId(nutrientId)
                    .stream()
                    .forEach(nutriIngredient -> {
                        if(nutriIngredient.getIngredientAmount() != null) {
                            Ingredient ingredient = nutriIngredient.getIngredient();
                            map.put(ingredient.getIngredientName(), nutriIngredient.getIngredientAmount());
                            String IID = INGREDIENT_NAME + ingredient.getIngredientName();
                            String intake = redisUtil.getIntake(IID);
                            // 권장섭취량 캐싱여부 확인, 캐싱되어 있다면 값 가져와서 사용 캐싱되지 않았다면 권장섭취량 캐싱
                            if(intake == null){
                                intake = ingredient.getIngredientRecommendedIntakeStart()+ TILDE + ingredient.getIngredientRecommendedIntakeEnd();
                                redisUtil.setData(IID,intake);
                            }
                            ingredientIntake.put(ingredient.getIngredientName(), intake);
                            nutrientIngredient.put(nutriIngredient.getIngredient().getIngredientName(), nutriIngredient.getIngredientAmount());
                        }
                    });
            redisUtil.cacheNutrient(nID, map);
        }
        getIngredientTotal(ingredientTotal, nutrientIngredient);
    }
    public void getIngredientTotal(HashMap<String, String> ingredientTotal, HashMap<String, String> nutrientIngredient){
        for(String ingredientName : nutrientIngredient.keySet()){
            if( nutrientIngredient.get(ingredientName) == null) continue;
            double tmp = Double.valueOf(nutrientIngredient.get(ingredientName).replaceAll(REGULAR_EXPRESSION_FIND_NUMBER,EMPTYSTRING));
            if(ingredientTotal.containsKey(ingredientName)){
                tmp += Double.valueOf(ingredientTotal.get(ingredientName).replaceAll(REGULAR_EXPRESSION_FIND_NUMBER,EMPTYSTRING));
            }
            ingredientTotal.put(ingredientName, Math.round(tmp*1000)/1000.0 + nutrientIngredient.get(ingredientName).replaceAll(REGULAR_EXPRESSION_FIND_UNIT,EMPTYSTRING));
        }
    }
    
    public ResponseNutrientIngredientDto getNutrientIngredientInfo(Long nutrientId){
        List<ResponseNutrientIngredientInfoDto> nutrientIngredientInfoList = new LinkedList<>();
        String nID = NUTRIENT_ID + nutrientId;
        //캐싱되어 있다면
        if(redisUtil.hasNutrient(nID, nID)) {
            for(Object key : redisUtil.getKeys(nID)){
                if(!key.toString().equals(nID)) {
                    nutrientIngredientInfoList.add(new ResponseNutrientIngredientInfoDto(key.toString(), redisUtil.getNutrientInfo(nID, key.toString())));
                }
            }
        } else {
            Map<String, Object> map = new HashMap<>();
            map.put(nID, nID);
            nutrientIngredientRepository.findNutrientIngredientsByNutrient_NutrientId(nutrientId)
                    .stream()
                    .forEach(nutrientIngredient -> {
                        if(nutrientIngredient.getIngredientAmount() != null) {
                            map.put(nutrientIngredient.getIngredient().getIngredientName(), nutrientIngredient.getIngredientAmount());
                            nutrientIngredientInfoList.add(new ResponseNutrientIngredientInfoDto(nutrientIngredient));
                        }
                    });
            redisUtil.cacheNutrient(nID, map);
        }
        return new ResponseNutrientIngredientDto(nutrientId,nutrientIngredientInfoList);
    }

    public boolean deleteInterestNutrient(int userId, Long nutrientId) {
        Optional<InterestNutrient> interestNutrient = interestNutrientRepository.findByNutrient_NutrientIdAndUser_UserId(nutrientId, userId);
        if(!interestNutrient.isPresent()) return false;
        interestNutrientRepository.delete(interestNutrient.get());
        return true;
    }

    public List<ResponseNutrientListDto> getInterestList(int userId) {
        List<InterestNutrient> interestNutrientList =  interestNutrientRepository.findByUser_UserId(userId);
        List<ResponseNutrientListDto> nutrientList = new ArrayList<>();

        for (InterestNutrient interestNutrient:interestNutrientList) {
            nutrientList.add(new ResponseNutrientListDto(interestNutrient.getNutrient().getNutrientId(), interestNutrient.getNutrient().getNutrientName(),interestNutrient.getNutrient().getNutrientImageUrl(),interestNutrient.getNutrient().getNutrientBrand(),true));
        }

        return nutrientList;
    }

    public List<ResponseTakingNutrientInfoDto> getTakingNutrientWithIngredient(int userId) {
        List<ResponseTakingNutrientInfoDto> takingNutrientList = new ArrayList<>();

        takingNutrientRepository.findByUser_UserId(userId).stream().forEach(takingNutrient -> {
            List<ResponseNutrientIngredientInfoDto> nutrientIngredientInfoList = getNutrientIngredientInfo(takingNutrient.getNutrient().getNutrientId()).getIngredientInfoList();
            takingNutrientList.add(new ResponseTakingNutrientInfoDto(takingNutrient,nutrientIngredientInfoList));
        });

        return takingNutrientList;
    }
    
    //휴대폰 번호 인증한 유저인지 확인메소드
    public boolean checkPhoneCheckYn(int userId) {
        Optional<User> user = userRepository.findByUserId(userId);
        if(!user.isPresent()) return false;
        
        if(user.get().getUserPhoneCheckYn().equals("Y")) {
            return true;
        } else {
            return false;
        }
    }
}
