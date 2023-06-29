//react-query를 사용한 hook
import {
  QueryOptions,
  UseQueryResult,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import api from './config';
import axios, { AxiosResponse } from 'axios';

export const queryKey = process.env.REACT_APP_API_URL;

//검색어를 통해 검색결과를 조회하는 api
export const useSearch = (
  keyword: string,
  options?: QueryOptions,
): UseQueryResult => {
  const queryKey = process.env.REACT_APP_API_URL;
  const queryFn = async () => {
    const res: AxiosResponse = await axios.get(
      `https://o-nu.com/search/${keyword}`,
    );
    return res;
  };

  return useQuery([queryKey, keyword], queryFn, { ...options });
};

////////////////config에 있는 목록 중 안만든 hoos, 만들면 아래 목록에서 지울것

//토큰 재발급

//회원탈퇴
//닉네임 중복검사

//회원정보 수정

//회원이 쓴 리뷰 수정
//회원이 쓴리뷰 삭제

//선택한 제품에 리뷰 등록
//설문용 질문리스트 호출
//설문결과 조회
//복용알림 시간 등록
//복용알림 취소
//건강정보 목록조회
//건강정보 상세조회

////////////////////////////////

//선택한 제품에 리뷰 등록
export const useAddReview = (
  userId: number,
  nutrientId: number,
  reviewContent: string,
  reviewScore: number,
) => {
  const mutateFn = async () => {
    const res = await api.addReview(
      userId,
      nutrientId,
      reviewContent,
      reviewScore,
    );
    return res;
  };
  return useMutation([queryKey], mutateFn);
};

//복용중인 영양제 목록 조회
export const useTakingPill = (userId: number) => {
  const queryFn = async () => {
    const res = await api.getTakingPillList(userId);
    return res;
  };
  return useQuery([queryKey, userId], queryFn);
};

//복용중인 영양제 등록
export const useAddTakingPill = (
  userId: number,
  takingPillId: number,
) => {
  const mutateFn = async () => {
    const res = await api.addTakingPill(userId, takingPillId);
    return res;
  };
  return useQuery([queryKey, userId, takingPillId], mutateFn);
};

//복용중인 영양제 삭제
export const useDeleteTakingPill = (
  userId: number,
  takingPillId: number,
) => {
  const mutateFn = async () => {
    const res = await api.deleteTakingPill(userId, takingPillId);
    return res;
  };
  return useQuery([queryKey, userId, takingPillId], mutateFn);
};

//복용중인 영양제 목록 조회(성분 포함)
export const useTakingPillIngredient = (userId: number) => {
  const queryFn = async () => {
    const res = await api.getTakingPillIngredientList(userId);
    return res;
  };
  return useQuery([queryKey, userId], queryFn);
};

//관심 영양제 목록 조회
export const useInterestPill = (userId: number) => {
  const queryFn = async () => {
    const res = await api.getInterestPillList(userId);
    return res;
  };
  return useQuery([queryKey, userId], queryFn);
};

//관심 영양제 삭제
export const useDeleteInterest = (
  userId: number,
  nutrientId: number,
) => {
  const mutateFn = async () => {
    const res = await api.deleteInterestPill(userId, nutrientId);
    return res;
  };
  return useMutation([queryKey, userId, nutrientId], mutateFn);
};

//관심 영양제 등록하는 api
export const useAddInterest = (
  userId: number,
  nutrientId: number,
) => {
  const mutateFn = async () => {
    const res = await api.addInterestPill(userId, nutrientId);
    return res;
  };
  return useMutation([queryKey, userId, nutrientId], mutateFn);
};

//선택한 영양제 리뷰목록 조회하는 api
export const usePillReviewList = (
  nutrientId: number,
  // options: QueryOptions,
) => {
  const queryFn = async () => {
    const res = await api.getPillReviewList(nutrientId);
    return res;
  };
  return useQuery([queryKey, nutrientId], queryFn);
};

//비교페이지
//영양제 두개 영양성분 비교하는 api
export const useComparePill = (
  nutrientId: number,
  compareId: number,
) => {
  const queryFn = async () => {
    const res = await api.comparePill(nutrientId, compareId);
    return res;
  };
  return useQuery([queryKey, nutrientId, compareId], queryFn);
};

//영양제 조합 목록 조회
export const useCombList = (
  userId: number,
  options?: QueryOptions,
) => {
  const queryFn = async () => {
    const res = await api.getCombList(userId);
    return res;
  };
  return useQuery([queryKey, userId], queryFn);
};

//영양제 조합 저장
export const useSaveComb = (
  userId: number,
  combinationList: number[],
) => {
  const mutateFn = async () => {
    const res = await api.saveComb(userId, combinationList);
    return res;
  };
  return useMutation([queryKey], mutateFn);
};

//영양제 조합 삭제
export const useDeleteComb = (
  userId: number,
  combinationId: number,
) => {
  const mutateFn = async () => {
    const res = await api.deleteComb(userId, combinationId);
    return res;
  };
  return useMutation([queryKey], mutateFn);
};

export const useStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    const item = localStorage.getItem(key);
    return item;
  }

  return null;
};
