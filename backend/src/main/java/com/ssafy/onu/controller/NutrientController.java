package com.ssafy.onu.controller;

import com.ssafy.onu.dto.request.ReqReviewCreateFormDto;
import com.ssafy.onu.dto.response.ResponseNutrientDetailDto;
import com.ssafy.onu.dto.response.ResponseNutrientListDto;
import com.ssafy.onu.dto.response.ResponseReviewDto;
import com.ssafy.onu.service.NutrientService;
import com.ssafy.onu.service.ReviewService;
import com.ssafy.onu.util.TokenUtils;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/nutrient")
@RequiredArgsConstructor
public class NutrientController {

    private static final String MESSAGE = "message";
    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";
    private static final int ZERO = 0;
    private final ReviewService reviewService;
    private final NutrientService nutrientService;

    @ApiOperation(value = "제품 리뷰 등록", notes = "해당 영양제 제품에 대한 리뷰를 등록한다.", response = Map.class)
    @PostMapping("/{nutrientId}/{userId}")
    public ResponseEntity<Map<String, Object>> createReview(@PathVariable @ApiParam(value = "회원 아이디", required = true, example = "0") int userId, Principal principal,
                                                            @PathVariable @ApiParam(value = "영양제 아이디", required = true, example = "0") Long nutrientId,
                                                            @RequestBody ReqReviewCreateFormDto reqReviewCreateFormDto) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        // PathVariable로 받은 userId와 토큰에 있는 userId 비교
        if(TokenUtils.compareUserIdAndToken(userId, principal,resultMap)) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(resultMap, status);
        }

        ResponseReviewDto responseReviewDto = reviewService.createReview(reqReviewCreateFormDto, userId, nutrientId);

        if (responseReviewDto != null) {
            resultMap.put(MESSAGE, SUCCESS);
            resultMap.put("createReview", responseReviewDto);
            return new ResponseEntity<>(resultMap, HttpStatus.OK);
        } else {
            resultMap.put(MESSAGE, FAIL);
            return new ResponseEntity<>(resultMap, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "제품 리뷰 목록 조회", notes = "해당 영양제 제품에 대한 모든 리뷰를 조회한다.", response = Map.class)
    @GetMapping("/{nutrientId}/review")
    public ResponseEntity<Map<String, Object>> getReviewListByNutrient(@PathVariable @ApiParam(value = "영양제 아이디", required = true, example = "0") Long nutrientId) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        List<ResponseReviewDto> responseReviewDtoList = reviewService.getReviewListByNutrient(nutrientId);

        resultMap.put(MESSAGE, SUCCESS);
        resultMap.put("reviewListByNutrient", responseReviewDtoList);
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @ApiOperation(value = "성분별 영양제 목록 조회", notes = "성분별 영양제에 대한 목록을 조회한다.", response = Map.class)
    @GetMapping("/ingredient/{ingredientId}")
    public ResponseEntity<Map<String, Object>> getNutrientByIngredient(@PathVariable @ApiParam(value = "성분 아이디", required = true, example = "0") int ingredientId,
                                                                        @RequestParam @ApiParam(value = "회원 아이디", required = false, example = "0")int userId, Principal principal) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        // PathVariable로 받은 userId와 토큰에 있는 userId 비교
        if(userId > ZERO && TokenUtils.compareUserIdAndToken(userId, principal,resultMap)) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(resultMap, status);
        }

        List<ResponseNutrientListDto> nutrientListByIngreidientList = nutrientService.getNutrientByIngredient(ingredientId, userId);

        resultMap.put(MESSAGE, SUCCESS);
        resultMap.put("nutrientListByIngreidientList", nutrientListByIngreidientList);
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }

    @ApiOperation(value = "기능별 영양제 목록 조회", notes = "기능별 영양제에 대한 목록을 조회한다.", response = Map.class)
    @GetMapping("/function/{functionId}")
    public ResponseEntity<Map<String, Object>> getNutrientByFunction(@PathVariable @ApiParam(value = "기능 아이디", required = true, example = "0") int functionId,
                                                                       @RequestParam @ApiParam(value = "회원 아이디", required = false, example = "0")int userId, Principal principal) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        // PathVariable로 받은 userId와 토큰에 있는 userId 비교
        if(userId > ZERO && TokenUtils.compareUserIdAndToken(userId, principal,resultMap)) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(resultMap, status);
        }

        List<ResponseNutrientListDto> nutrientListByIngreidientList = nutrientService.getNutrientByFunction(functionId, userId);

        resultMap.put(MESSAGE, SUCCESS);
        resultMap.put("nutrientListByFunctionList", nutrientListByIngreidientList);
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }
    @ApiOperation(value = "영양제의 상세 정보 조회", notes = "선택한 영양제에 대한 상세 정보를 조회한다.", response = Map.class)
    @GetMapping("{nutrientId}")
    public ResponseEntity<Map<String, Object>> getNutrientDetail(@PathVariable @ApiParam(value = "영양제 아이디", required = true, example = "0") long nutrientId,
                                                                     @RequestParam @ApiParam(value = "회원 아이디", required = false, example = "0")int userId, Principal principal) {
        Map<String, Object> resultMap = new HashMap<>();
        HttpStatus status = null;

        // PathVariable로 받은 userId와 토큰에 있는 userId 비교
        if(userId > ZERO && TokenUtils.compareUserIdAndToken(userId, principal,resultMap)) {
            status = HttpStatus.BAD_REQUEST;
            return new ResponseEntity<>(resultMap, status);
        }

        ResponseNutrientDetailDto nutrientDetail = nutrientService.getNutrientDetail(nutrientId, userId);

        resultMap.put(MESSAGE, SUCCESS);
        resultMap.put("nutrientDetail", nutrientDetail);
        return new ResponseEntity<>(resultMap, HttpStatus.OK);
    }


}
