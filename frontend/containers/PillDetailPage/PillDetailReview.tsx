import React from 'react';
import { useState, useEffect } from 'react';

import PillReviewForm from './PillReviewForm';
import PillDetailReviewBox from './PillDetailReviewBox';
import PillDetailRate from './PillDetailRate';
import StarRating from '@/components/common/StarRating';
import { usePillReviewList } from '@/apis/hooks';
import api from '@/apis/config';
import axios from 'axios';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/navigation';

type reviewContents = {
  userNickname: string;
  nutrientName: string;
  reviewContent: string;
  userAge: number;
  userGender: string;
  reviewScore: number;
  reviewCreateTime: string;
  reviewUpdateTime: string;
};

type Props = {
  nutrientId: number;
  userId: number | undefined;
  reRendering: () => void;
};

function PillDetailReview(props: Props) {
  const [wantReview, setWantReview] = useState<boolean>(false);
  const [reviewList, setReviewList] = useState<Array<reviewContents>>(
    [],
  );
  const [statistic, setStatistic] = useState<Array<number>>([
    0, 0, 0, 0, 0,
  ]);
  const [average, setAverage] = useState<number>(0);
  const [graphValue, setGraphValue] = useState<Array<number>>([
    0, 0, 0, 0, 0,
  ]);
  const router = useRouter();

  const openReviewForm = () => {
    if (props.userId) setWantReview(true);
    else {
      if (
        window.confirm(
          '로그인이 필요한 서비스입니다. 로그인하시겠습니까?',
        )
      ) {
        router.push('/user/login');
      }
    }
  };

  useEffect(() => {
    const getReviewData = async () => {
      await api
        .getPillReviewList(props.nutrientId)
        .then((res) => setReviewList(res.data.reviewListByNutrient));
    };

    getReviewData();
  }, [props]);

  useEffect(() => {
    console.log(reviewList);
    makeStatistics();
  }, [reviewList]);

  useEffect(() => {
    averageScore();
  }, [statistic]);

  useEffect(() => {
    makeGraphRate();
  }, [average]);

  //별점마다 개수 세는 함수
  const makeStatistics = () => {
    const scoreArray = [0, 0, 0, 0, 0];

    reviewList.map((review, idx) => {
      const key = idx;
      scoreArray[review.reviewScore - 1]++;
    });
    setStatistic(scoreArray);
  };

  //별점 평균내는 함수
  const averageScore = () => {
    let sum = 0;
    for (let i = 0; i < 5; i++) {
      sum += statistic[i] * (i + 1);
    }

    if (reviewList.length != 0) {
      setAverage(Number((sum / reviewList.length).toFixed(1)));
    } else {
      setAverage(0);
    }
  };

  //리뷰 그래프 비율계산하는 함수
  const makeGraphRate = () => {
    const scoreArrayForGraph = [0, 0, 0, 0, 0];

    for (let i = 0; i < 5; i++) {
      let tmp = (statistic[i] / reviewList.length) * 100;
      if (0 < tmp && tmp < 10) {
        scoreArrayForGraph[i] = 5;
      } else if (tmp == 0) {
        scoreArrayForGraph[i] = 0;
      } else if (tmp == 100) {
        scoreArrayForGraph[i] = 100;
      } else {
        scoreArrayForGraph[i] = Math.round(tmp / 10) * 10;
      }
      // console.log(tmp);
    }
    // console.log(scoreArrayForGraph);
    setGraphValue(scoreArrayForGraph);
  };

  return (
    <div>
      <div>
        <div className="bg-[#FFFCED] h-[250px] px-5 rounded-lg mt-3">
          <div className="pt-6">
            <div className="grid grid-cols-2">
              <div className="grid justify-center col-span-1">
                총 평점
              </div>
              <div className="grid justify-center col-span-1">
                평점 비율
              </div>
            </div>
          </div>

          <div className="bg-white pb-2 mt-3 grid grid-cols-2 rounded-lg">
            <div className="col-span-1  grid justify-center">
              <div className="grid justify-center mt-3 mb-1">
                <StarRating rating={average} size="detail" />
              </div>

              <div className="text-center h-2 mb-3">
                {average} / 5
              </div>
              <label
                htmlFor="my-modal-6"
                className="sm:w-40 w-32 mx-auto text-white btn btn-primary rounded-xl"
                style={{
                  backgroundColor: '#90B5EA',
                  // width: '170px',
                  // height: '30px',
                  border: 'none',
                }}
                onClick={openReviewForm}
              >
                리뷰 작성하기
              </label>
            </div>
            {/* 평점 비율 */}
            <PillDetailRate
              graphValue={graphValue}
              statistic={statistic}
            />
          </div>
        </div>
        {wantReview && (
          <PillReviewForm
            nutrientId={props.nutrientId}
            reRendering={props.reRendering}
          />
        )}
        {reviewList.map((review, idx) => (
          <PillDetailReviewBox key={idx} review={review} />
        ))}
      </div>
      {reviewList.length === 0 && (
        <div className="w-100 text-center py-10 mt-2 mb-5 rounded-md bg-yellow-100">
          리뷰가 없어요! 첫 리뷰를 작성해주세요😍
        </div>
      )}
    </div>
  );
}

export default PillDetailReview;
