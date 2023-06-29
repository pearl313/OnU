import React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { haveStore } from '@/store/haveStore';
import { makeCombinationStore } from '@/store/makeCombinationStore';

type Ingredient = {
  ingredientId: number;
  ingredientName: string;
  ingredientAmount: string;
};

type have = {
  havingNutrientList: number;
  nutrientId: number;
  nutrientName: string;
  nutrientImageUrl: string;
  nutrientBrand: string;
  nutrientIngredientList: Array<Ingredient>;
};

type Props = {
  nutrient: have;
  renew: () => void;
  cancle: boolean;
  makehaveLikeComb: () => void;
};

function PillAnalysisHave(props: Props) {
  //이 영양제가 선택되었는지 여부를 저장
  const [isSelected, setIsSelected] = useState<boolean>(true);

  const { combList, addSelected, removeSelected } =
    makeCombinationStore();

  useEffect(() => {
    if (props.cancle) {
      setIsSelected(false);
      props.renew();
    }
  }, [props.cancle]);

  //영양제 선택하면 css 변경 및 선택 영양제 리스트에 id제공여부 결정하는 함수
  const selectThis = (event: React.MouseEvent) => {
    //선택 되어있으면
    if (isSelected) {
      removeSelected(props.nutrient.nutrientId);
      console.log(combList);
    } else {
      //선택 안되어있으면
      addSelected(props.nutrient.nutrientId);
      console.log(combList);
    }

    setIsSelected(!isSelected);
    props.makehaveLikeComb();
  };

  return (
    <div
      className="w-1/3 mt-6 transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-200"
      onClick={selectThis}
    >
      <div
        className={` ${
          isSelected ? 'bg-[#90B5EA]' : 'bg-[#D8EDFF]'
        } sm:w-32 sm:h-32 w-24 h-28 rounded-xl mx-auto grid content-center`}
      >
        <div className="mx-auto bg-white rounded-lg sm:w-28 sm:h-28 w-20 h-24">
          <div className="relative sm:w-16 sm:h-16 w-12 h-12 mx-auto">
            <Image
              className="w-full h-full mt-1"
              src={props.nutrient.nutrientImageUrl}
              alt="사진깨짐"
              width={100}
              height={100}
            />
          </div>
          <div className="text-xs leading-3 text-center text-gray-400">
            {props.nutrient.nutrientBrand}
          </div>
          {/* 디자인상 이유로 영양제 이름 2줄에서 자름 ( 수정 가능 일단 2줄로 설정 ) */}
          <div className="leading-4 text-center line-clamp-2">
            {props.nutrient.nutrientName}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PillAnalysisHave;
