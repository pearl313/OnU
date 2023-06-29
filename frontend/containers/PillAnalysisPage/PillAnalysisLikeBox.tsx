import React, { useEffect, useState } from 'react';
import PillAnalysisLike from './PillAnalysisLike';
import { useInterestPill } from '@/apis/hooks';
import api from '@/apis/config';

type Props = {
  userId: number;
  reRendering: () => void;
  cancle: boolean;
  renew: () => void;
  makehaveLikeComb: () => void;
};

type interest = {
  interestNutrientId: number;
  nutrientId: number;
  nutrientName: string;
  nutrientImageUrl: string;
  nutrientBrand: string;
};

function PillAnalysisLikeBox(props: Props) {
  //관심 목록 저장
  const [interestList, setInterestList] = useState<Array<interest>>(
    [],
  );

  useEffect(() => {
    if (props.userId !== undefined) {
      getInterestData()
        .then((res) => {
          console.log(res);
          if (res) {
            setInterestList(res.data.interestNutrientList);
          }
        })
        .catch((error) => console.log(error));
    }
  }, [props]);

  const getInterestData = async () => {
    return await api.getInterestPillList(props.userId);
  };

  return (
    <div>
      <div className="flex flex-wrap">
        {interestList &&
          interestList.map((nutrient, index) => (
            <PillAnalysisLike
              key={interestList[index].interestNutrientId}
              nutrient={nutrient}
              reRendering={props.reRendering}
              cancle={props.cancle}
              renew={props.renew}
              makehaveLikeComb={props.makehaveLikeComb}
            />
          ))}
      </div>
      {interestList.length === 0 && (
        <div className="w-100 text-center py-10 mt-2 mb-5 rounded-md bg-yellow-100">
          관심 영양제가 없어요! + 버튼으로 새로운 관심 영양제를
          추가해보세요
        </div>
      )}
    </div>
  );
}

export default PillAnalysisLikeBox;
