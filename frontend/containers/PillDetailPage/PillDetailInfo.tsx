import React from 'react';
import { useState, useEffect } from 'react';
import PillDetailBadge from './PillDetailBadge';
import PillDetailImg from './PillDetailImg';
import PillDetailContents from './PillDetailContents';
import PillDetailNutrientGage from './PillDetailNutrientGage';
import yellowCircle from '../../public/yellowCircle.png';
import greenCircle from '../../public/greenCircle.png';
import redCircle from '../../public/redCircle.png';
import Image from 'next/image';

type Props = {
  nutrientList: nutrientDetail;
};

function PillDetailInfo(props: Props) {
  const [nutrientList, setNutrientList] = useState<nutrientDetail>(
    props.nutrientList,
  );

  useEffect(() => {
    setNutrientList(props.nutrientList);
  }, [props.nutrientList]);

  return (
    <div>
      <PillDetailBadge
        subject="기능성"
        badges={nutrientList.functionList}
      />
      <PillDetailImg
        subject="제형"
        pillType={nutrientList.nutrientType}
      />

      <div className="bg-white px-5 py-30 grid grid-cols-6 rounded-lg mt-3 min-h-[140px]">
        <div className="grid content-center col-span-1 font-semibold">
          영양성분
        </div>
        <div className="col-span-5 mt-5">
          <div className="flex flex-row-reverse my-1">
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
          <div className="grid content-center pl-2 mb-3">
            {nutrientList &&
              nutrientList.ingredientList.map((nutrient, idx) => (
                <PillDetailNutrientGage
                  key={idx}
                  ingredientName={nutrient.ingredientName}
                  ingredientAmount={nutrient.ingredientAmount}
                  recommendedIntakeStart={
                    nutrient.recommendedIntakeStart
                  }
                  recommendedIntakeEnd={nutrient.recommendedIntakeEnd}
                />
              ))}
          </div>
        </div>
      </div>

      <PillDetailContents
        subject="섭취방법"
        content={nutrientList.nutrientIntake}
      />
      <PillDetailContents
        subject="섭취 시 주의사항"
        content={nutrientList.nutrientCaution}
      />
      <PillDetailContents
        subject="유효기간"
        content={nutrientList.nutrientExpiration}
      />
      <PillDetailContents
        subject="원재료"
        content={nutrientList.nutrientMaterial}
      />
    </div>
  );
}

export default PillDetailInfo;
