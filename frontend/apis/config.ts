//API 호출에 사용할 함수들을 정리해놓은 파일입니다
import axios, { AxiosResponse } from 'axios';
import { baseAPI, authAPI } from './axios';

//사용은 api.함수명()으로 하면 됩니다
const api = {
  //로그아웃
  async logoutUser(userId: number): Promise<AxiosResponse> {
    return await authAPI(`/user/logout/${userId}`, {
      method: 'GET',
    });
  },

  //회원가입
  async signupUser(
    userId: number,
    nickname: string,
    age: string,
    gender: string,
  ): Promise<AxiosResponse> {
    return await authAPI(`/user/${userId}`, {
      method: 'POST',
      data: {
        userNickname: nickname,
        userAge: age,
        userGender: gender,
      },
    });
  },

  //회원탈퇴
  async deleteUser(userId: number): Promise<AxiosResponse> {
    return await authAPI(`/user/${userId}`, {
      method: 'DELETE',
    });
  },

  //닉네임 중복검사
  async checkNickname(userNickname: string): Promise<AxiosResponse> {
    return await baseAPI(`/user/${userNickname}`, {
      method: 'GET',
    });
  },

  //전화번호 인증 메시지 전송
  async sendVerificationCode(
    userId: number,
    phone: string,
  ): Promise<AxiosResponse> {
    return await baseAPI(`/user/sms`, {
      method: 'POST', //GET?
      data: {
        userId,
        phone,
        authCode: null,
      },
    });
  },

  //전화번호 인증(인증번호 일치여부 확인)
  async verifyPhoneNumber(
    userId: number,
    phone: string,
    authCode: string,
  ): Promise<AxiosResponse> {
    return await baseAPI(`/user/phone`, {
      method: 'POST',
      data: {
        authCode,
        phone,
        userId,
      },
    });
  },

  //회원정보 조회(마이페이지)
  async getUserInfo(userId: number): Promise<AxiosResponse> {
    return await authAPI(`/mypage/${userId}`, {
      method: 'GET',
    });
  },

  //회원정보 수정(추가정보 등록)
  async updateUserInfo(
    userId: number,
    nickname: string,
    gender: string,
  ): Promise<AxiosResponse> {
    return await authAPI(`/mypage/${userId}`, {
      method: 'PATCH',
      data: {
        userGender: gender,
        userNickname: nickname,
      },
    });
  },

  //캘린더 조회(복용날짜 조회)
  async getCalendar(
    userId: number,
    date: string,
  ): Promise<AxiosResponse> {
    return await authAPI(`/mypage/${userId}/calendar`, {
      method: 'GET',
      params: {
        date: date, //"2023-05" 같은 형식
      },
    });
  },

  //복용여부 체크
  async checkPill(userId: number): Promise<AxiosResponse> {
    return await authAPI(`/mypage/${userId}/calendar`, {
      method: 'POST',
    });
  },

  //복용중인 영양제 목록 조회
  async getTakingPillList(userId: number): Promise<AxiosResponse> {
    return await authAPI(`/mypage/${userId}/taking`, {
      method: 'GET',
    });
  },

  //복용중인 영양제 등록
  async addTakingPill(
    userId: number,
    takingPillId: number,
  ): Promise<AxiosResponse> {
    return await authAPI(`/mypage/${userId}/taking/${takingPillId}`, {
      method: 'POST',
    });
  },

  //복용중인 영양제 삭제
  async deleteTakingPill(
    userId: number,
    takingPillId: number,
  ): Promise<AxiosResponse> {
    return await authAPI(`/mypage/${userId}/taking/${takingPillId}`, {
      method: 'DELETE',
    });
  },

  //회원이 쓴 모든 리뷰 조회
  async getReviewList(userId: number): Promise<AxiosResponse> {
    return await authAPI(`/mypage/${userId}/review`, {
      method: 'GET',
    });
  },

  //회원이 쓴 리뷰 수정
  async updateReview(
    userId: number,
    reviewId: number,
    reviewContent: string,
    reviewScore: number,
  ): Promise<AxiosResponse> {
    return await authAPI(`/mypage/${userId}/review/${reviewId}`, {
      method: 'PATCH',
      data: {
        reviewContent,
        reviewScore,
      },
    });
  },

  //회원이 쓴리뷰 삭제
  async deleteReview(
    userId: number,
    reviewId: number,
  ): Promise<AxiosResponse> {
    return await authAPI(`/mypage/${userId}/review/${reviewId}`, {
      method: 'DELETE',
    });
  },

  //복용 영양제 목록 조회(성분 포함)
  async getTakingPillIngredientList(
    userId: number,
  ): Promise<AxiosResponse> {
    return await authAPI(`/mypage/${userId}/taking/ingredient`, {
      method: 'GET',
    });
  },

  //관심 영양제 목록 조회
  async getInterestPillList(userId: number): Promise<AxiosResponse> {
    return await authAPI(`/mypage/${userId}/interest`, {
      method: 'GET',
    });
  },

  //관심 영양제 삭제
  async deleteInterestPill(
    userId: number,
    nutrientId: number,
  ): Promise<AxiosResponse> {
    return await authAPI(`/mypage/${userId}/interest/${nutrientId}`, {
      method: 'DELETE',
    });
  },

  //관심 영양제 등록
  async addInterestPill(
    userId: number,
    nutrientId: number,
  ): Promise<AxiosResponse> {
    return await authAPI(`/mypage/${userId}/interest/${nutrientId}`, {
      method: 'POST',
    });
  },

  //영양제 검색
  async searchPill(keyword: string): Promise<AxiosResponse> {
    // return await baseAPI(`/search/${keyword}`, {
    //   method: 'GET',
    // });
    return await axios.get(
      `https://k8a703.p.ssafy.io/search/${keyword}`,
    );
  },

  //영양제 조합 목록 조회
  async getCombList(userId: number): Promise<AxiosResponse> {
    return await authAPI(`/mypage/${userId}/combination`, {
      method: 'GET',
    });
  },

  //영양제 조합 저장
  async saveComb(
    userId: number,
    combinationList: number[],
  ): Promise<AxiosResponse> {
    return await authAPI(`/mypage/${userId}/combination`, {
      method: 'POST',
      data: {
        nutrientList: combinationList,
      },
    });
  },

  //영양제 조합 삭제
  async deleteComb(
    userId: number,
    combinationId: number,
  ): Promise<AxiosResponse> {
    return await authAPI(`/mypage/${userId}/combination`, {
      method: 'DELETE',
      params: {
        combinationId,
      },
    });
  },

  //영양제 조합에 따른 성분목록 조회
  async getIngredientListByCombination(
    userId: number,
    combinationList: number[],
  ): Promise<AxiosResponse> {
    return await authAPI(`/mypage/${userId}/combination/ingredient`, {
      method: 'POST',
      data: {
        nutrientList: combinationList,
      },
    });
  },

  //성분별 영양제 목록 조회
  async getPillListByIngredient(
    userId: number,
    ingredientId: number,
  ): Promise<AxiosResponse> {
    return await baseAPI(`/nutrient/${ingredientId}/${userId}`, {
      method: 'GET',
    });
  },

  //기능별 영양제 목록 조회
  async getPillListByFunction(
    userId: number,
    functionId: number,
  ): Promise<AxiosResponse> {
    return await baseAPI(`/nutrient/${functionId}/${userId}`, {
      method: 'GET',
    });
  },

  //영양제 상세정보 조회
  async getPillDetail(
    nutrientId: number,
    userId: number,
  ): Promise<AxiosResponse> {
    if (!userId) {
      return await baseAPI(`/nutrient/${nutrientId}?userId=0`, {
        method: 'GET',
      });
    }
    return await authAPI(`/nutrient/${nutrientId}?userId=${userId}`, {
      method: 'GET',
    });
  },

  //선택한 영양제 리뷰목록 조회
  async getPillReviewList(
    nutrientId: number,
  ): Promise<AxiosResponse> {
    return await baseAPI(`/nutrient/${nutrientId}/review`, {
      method: 'GET',
    });
  },

  //선택한 제품에 리뷰 등록
  async addReview(
    userId: number,
    nutrientId: number,
    reviewContent: string,
    reviewScore: number,
  ): Promise<AxiosResponse> {
    return await authAPI(`/nutrient/${nutrientId}/${userId}`, {
      method: 'POST',
      data: {
        reviewContent,
        reviewScore,
      },
    });
  },

  //비교할 영양제 정보 조회
  async comparePill(
    nutrientId: number,
    compareId: number,
  ): Promise<AxiosResponse> {
    return await authAPI(`/compare/${nutrientId}/${compareId}`, {
      method: 'GET',
    });
  },

  //설문용 질문리스트 호출
  async getSurvey() {
    return await authAPI(`/survey`, {
      method: 'GET',
    });
  },

  // 설문 답변 리스트 전달
  async submitSurvey(
    userId: number,
    answers: any,
  ): Promise<AxiosResponse> {
    return await authAPI(`/recommend/${userId}`, {
      method: 'POST',
      data: {
        age: answers.age,
        functionList: answers.functionList,
        gender: answers.gender,
        pregnant: answers.pregnant,
        takingNutrientList: answers.takingNutrientList,
        typeList: answers.typeList,
      },
    });
  },

  //설문결과 조회
  async getSurveyResult(
    userId: number,
    survey: Survey,
  ): Promise<AxiosResponse> {
    return await authAPI(``, {
      method: 'POST',
      data: {
        userId: userId,
        survey: survey,
      },
    });
  },

  //복용알림 시간 등록
  async addAlarm(
    userId: number,
    time: string,
  ): Promise<AxiosResponse> {
    return await authAPI(`/notification/${userId}`, {
      method: 'POST',
      data: {
        time,
      },
    });
  },

  //복용알림 취소
  async deleteAlarm(): Promise<AxiosResponse> {
    return await authAPI(`/notification`, {
      method: 'DELETE',
    });
  },

  //건강정보 목록조회
  async getHealthInfoList(): Promise<AxiosResponse> {
    return await authAPI(`/healthinfo`, {
      method: 'GET',
    });
  },

  //건강정보 상세조회
  async getHealthInfoDetail(
    healthInfoId: number,
  ): Promise<AxiosResponse> {
    return await authAPI(`/healthinfo/${healthInfoId}`, {
      method: 'GET',
    });
  },

  //전화번호 인증상태 확인
  async checkAuth(userId: number): Promise<AxiosResponse> {
    return await baseAPI(`/mypage/phone/check/${userId}`, {
      method: 'GET',
    });
  },
};

export default api;
