import React from 'react';
import { useState, useEffect } from 'react';
import PillCompareBadge from './PillCompareBadge';
import PillCompareImg from './PillCompareImg';
import PillCompareContent from './PillCompareContent';
import PillCompareGage from './PillCompareGage';
import { itemStore } from '@/store/itemStore';
import fillHeart from '../../public/fillHeart.png';
import emptyHeart from '../../public/emptyHeart.png';
import yellowCircle from '../../public/yellowCircle.png';
import greenCircle from '../../public/greenCircle.png';
import redCircle from '../../public/redCircle.png';

import Image from 'next/image';
import useUserStore from '@/store/userStore';
import api from '@/apis/config';

type compareAmount = {
  ingredientName: string | undefined;
  amountA: string;
  amountB: string;
  recommendedIntakeStart: string;
  recommendedIntakeEnd: string;
};

function PillCompareMain(props: { query: string; compare: string }) {
  const Items = {
    message: 'success or fail',
    nutrientDetail: {
      nutrientId: 11,
      nutrientName: '스피루리나루리나',
      nutrientImageUrl:
        'https://shopping-phinf.pstatic.net/main_2506835/25068354527.20201202163623.jpg',
      nutrientBrand: '종근당',
      nutrientIntake:
        '1일 3회, 1회 4정 (1정당 250mg)을 물과 함께 섭취하십시오.', //섭취 방법
      nutrientCaution:
        '특정질환, 특이체질이거나 알러지 체질의 경우에는 간혹 개인에 따라 과민반응을 나타낼 수 있으므로 원료를 확인하신 후 섭취하십시오.', //섭취 시 주의사항
      nutrientExpiration: '제조일로부터 2년', //유효기간
      nutrientType: '가루', //제형
      nutrientMaterial:
        '스피루리나(고시형),구연산,프로필렌글리콜,글리세린지방산에스테르,글리세린지방산에스테르혼합제제용액,덱스트린,효소처리탱자추출물,효소처리탱자추출물,히드록시프로필메틸셀룰로스,스테아린산마그네슘,삼백초추출물분말,인동추출분말,당잔대뿌리,민들레,결명자추출물분말,당근,검정콩,명일엽,호박,케일잎,덱스트린,클로렐라(고시형),결정셀룰로스,칼슘(고시형)...', //원재료
      interested: true,
      ingredientList: [
        {
          ingredientName: '비타민A',
          ingredientAmount: '11mg α-TE',
          recommendedIntakeStart: '40mg α-TE',
          recommendedIntakeEnd: '50mg α-TE',
        },
      ],
      functionList: [
        '뼈 및 관절 건강과 근력 개선',
        '눈 건강(시력 및 피로감 케어)',
        '간 건강',
      ],
    },
  };

  const { items } = itemStore();

  const [firstLike, setFirstLike] = useState<boolean>(false);
  const [secondLike, setSecondLike] = useState<boolean>(false);

  const [nutrientListA, setNutrientListA] = useState<nutrientDetail>(
    Items.nutrientDetail,
  );
  const [nutrientListB, setNutrientListB] = useState<nutrientDetail>(
    Items.nutrientDetail,
  );

  const [userId, setUserId] = useState<number>(0);

  useEffect(() => {
    setUserId(parseInt(localStorage.getItem('userId') as string));
  }, []);

  useEffect(() => {
    comparePills();
  }, [userId, props.compare, props.query]);

  const comparePills = async () => {
    const res1 = await api
      .getPillDetail(parseInt(props.query), userId)
      .then((res) => res.data);

    const res2 = await api
      .getPillDetail(parseInt(props.compare), userId)
      .then((res) => res.data);

    setNutrientListA(res1.nutrientDetail);
    setNutrientListB(res2.nutrientDetail);
  };

  //위 두 영양성분 받아서 영양성분 이름으로만 된 배열로 각각 만들기
  const nutritionA = nutrientListA.ingredientList.map(
    (item) => item.ingredientName,
  );
  const nutritionB = nutrientListB.ingredientList.map(
    (item) => item.ingredientName,
  );

  //영양성분과 두 영양제가 포함하고 있는 양을 저장할 객체 배열 [{비타민A, 10, 20}]
  const nutritionProps: Array<compareAmount> = [];

  while (!(nutritionA.length === 0 && nutritionB.length === 0)) {
    let tmp: string | undefined;

    if (nutritionA.length != 0) {
      //배열의 첫번째 값 뽑아냄
      tmp = nutritionA.shift();
      if (tmp && nutritionB.includes(tmp)) {
        //b배열에 값 있으면 b배열에서 삭제
        //b배열에서 indexOf로 위치 인덱스 찾아서 spilce로 (위치, 변경할 개수)로 삭제
        nutritionB.splice(nutritionB.indexOf(tmp), 1);

        //영양성분 이름, 양A, 양B 객체로 묶어서 nutritionProps에 저장
        const nuA = nutrientListA.ingredientList.find(function (
          data,
        ) {
          return data.ingredientName === tmp;
        });
        const nuB = nutrientListB.ingredientList.find(function (
          data,
        ) {
          return data.ingredientName === tmp;
        });

        if (nuA && nuB) {
          nutritionProps.push({
            ingredientName: tmp,
            amountA: nuA.ingredientAmount,
            amountB: nuB.ingredientAmount,
            recommendedIntakeStart: nuA.recommendedIntakeStart,
            recommendedIntakeEnd: nuA.recommendedIntakeEnd,
          });
        }
      } else {
        //값 없으면 이미 a배열에서는 삭제된 상태
        const nuA = nutrientListA.ingredientList.find(function (
          data,
        ) {
          return data.ingredientName === tmp;
        });
        if (nuA) {
          nutritionProps.push({
            ingredientName: tmp,
            amountA: nuA.ingredientAmount,
            amountB: '0',
            recommendedIntakeStart: nuA.recommendedIntakeStart,
            recommendedIntakeEnd: nuA.recommendedIntakeEnd,
          });
        }
      }
    }
    if (nutritionB.length != 0) {
      tmp = nutritionB.shift();
      if (tmp && nutritionA.includes(tmp)) {
        nutritionA.splice(nutritionA.indexOf(tmp), 1);

        const nuA = nutrientListA.ingredientList.find(function (
          data,
        ) {
          return data.ingredientName === tmp;
        });
        const nuB = nutrientListB.ingredientList.find(function (
          data,
        ) {
          return data.ingredientName === tmp;
        });

        if (nuA && nuB) {
          nutritionProps.push({
            ingredientName: tmp,
            amountA: nuA.ingredientAmount,
            amountB: nuB.ingredientAmount,
            recommendedIntakeStart: nuA.recommendedIntakeStart,
            recommendedIntakeEnd: nuA.recommendedIntakeEnd,
          });
        }
      } else {
        console.log(tmp);
        //값 없으면 이미 a배열에서는 삭제된 상태
        const nuB = nutrientListB.ingredientList.find(function (
          data,
        ) {
          return data.ingredientName === tmp;
        });
        if (nuB) {
          nutritionProps.push({
            ingredientName: tmp,
            amountA: '0',
            amountB: nuB.ingredientAmount,
            recommendedIntakeStart: nuB.recommendedIntakeStart,
            recommendedIntakeEnd: nuB.recommendedIntakeEnd,
          });
        }
      }
    }
  }

  //좋아요 on/off
  const firstLikeOrNot = () => {
    if (firstLike) {
      removeInterest(nutrientListA.nutrientId);
    } else {
      addInterest(nutrientListA.nutrientId);
    }
    setFirstLike(!firstLike);
  };

  const secondLikeOrNot = () => {
    if (secondLike) {
      removeInterest(nutrientListB.nutrientId);
    } else {
      addInterest(nutrientListB.nutrientId);
    }
    setSecondLike(!secondLike);
  };

  const addInterest = async (nutrientId: number) => {
    const id: number = useUserStore.getState().user?.id as number;
    await api
      .addInterestPill(id, nutrientId)
      .then((res) => console.log(res));
  };

  const removeInterest = async (nutrientId: number) => {
    const id: number = useUserStore.getState().user?.id as number;
    await api
      .deleteInterestPill(id, nutrientId)
      .then((res) => console.log(res));
  };

  return (
    <div className="h-[100%] mt-20">
      <div className="grid grid-cols-2 mx-4">
        <div className="col-span-1 pr-2">
          <Image
            src={nutrientListA.nutrientImageUrl}
            alt="영양제 사진"
            width={200}
            height={200}
            className="mx-auto w-56 h-52 mb-2"
          />

          <div>
            <div className="grid grid-cols-4">
              <div className="grid content-center col-span-3 row-span-3 ml-1 text-sm font-light text-gray-500">
                {nutrientListB.nutrientBrand}
              </div>

              <div className="grid content-center col-span-1 justify-items-end">
                <button onClick={firstLikeOrNot}>
                  {firstLike ? (
                    <Image
                      className="w-6 h-6"
                      src={fillHeart}
                      alt="사진깨짐"
                    />
                  ) : (
                    <Image
                      className="w-6 h-6"
                      src={emptyHeart}
                      alt="사진깨짐"
                    />
                  )}
                </button>
              </div>
            </div>

            <div className="mt-2 text-xl font-medium">
              {nutrientListA.nutrientName}
            </div>
          </div>
        </div>
        <div className="col-span-1 pl-2">
          <Image
            src={nutrientListB.nutrientImageUrl}
            alt="영양제 사진"
            width={200}
            height={200}
            className="mx-auto  w-56 h-52 mb-2"
          />

          <div>
            <div className="grid grid-cols-4">
              <div className="grid content-center col-span-3 row-span-3 ml-1 text-sm font-light text-gray-500">
                {nutrientListB.nutrientBrand}
              </div>

              <div className="grid content-center col-span-1 justify-items-end">
                <button onClick={secondLikeOrNot}>
                  {secondLike ? (
                    <Image
                      className="w-6 h-6"
                      src={fillHeart}
                      alt="사진깨짐"
                    />
                  ) : (
                    <Image
                      className="w-6 h-6"
                      src={emptyHeart}
                      alt="사진깨짐"
                    />
                  )}
                </button>
              </div>
            </div>

            <div className="mt-2 text-xl font-medium">
              {nutrientListB.nutrientName}
            </div>
          </div>
        </div>
      </div>
      {/*여기는 파란부분 */}
      <div className="bg-[#F2F9FF] mt-8 h-full pt-6">
        <PillCompareBadge
          subject="기능성"
          first={nutrientListA.functionList}
          second={nutrientListB.functionList}
        />
        <PillCompareImg
          subject="제형"
          first={nutrientListA.nutrientType}
          second={nutrientListB.nutrientType}
        />
        <hr className="mx-4" />
        <div className="grid py-4 mx-4 bg-white tabs justify-items-center">
          <div className="font-semibold">영양 성분</div>
        </div>
        <hr className="mx-4" />
        <div className="col-span-1 py-4 mx-4 mt-2 mb-6 bg-white border rounded-lg">
          <div className="flex flex-row-reverse pr-2">
            <div className="flex items-center mx-1">
              <Image
                src={redCircle}
                alt="빨강"
                className="w-3 h-3 mr-1"
              />
              <div className="text-sm">과다</div>
            </div>
            <div className="flex items-center mx-1">
              <Image
                src={greenCircle}
                alt="초록"
                className="w-3 h-3 mr-1"
              />
              <div className="text-sm">적정</div>
            </div>
            <div className="flex items-center mx-1">
              <Image
                src={yellowCircle}
                alt="노랑"
                className="w-3 h-3 mr-1"
              />
              <div className="text-sm">부족</div>
            </div>
          </div>
          <div className="grid content-center px-2 mb-3">
            {nutritionProps.map((nutrient, idx) => (
              <PillCompareGage
                key={idx}
                nutrient={nutrient.ingredientName}
                amountA={nutrient.amountA}
                amountB={nutrient.amountB}
                recommendedIntakeStart={
                  nutrient.recommendedIntakeStart
                }
                recommendedIntakeEnd={nutrient.recommendedIntakeEnd}
              />
            ))}
          </div>
        </div>

        <PillCompareContent
          subject="섭취 방법"
          first={nutrientListA.nutrientIntake}
          second={nutrientListB.nutrientIntake}
        />
        <PillCompareContent
          subject="섭취 시 주의사항"
          first={nutrientListA.nutrientCaution}
          second={nutrientListB.nutrientCaution}
        />
        <PillCompareContent
          subject="유효기간"
          first={nutrientListA.nutrientExpiration}
          second={nutrientListB.nutrientExpiration}
        />
        <PillCompareContent
          subject="원재료"
          first={nutrientListA.nutrientMaterial}
          second={nutrientListB.nutrientMaterial}
        />
      </div>
    </div>
  );
}

export default PillCompareMain;
