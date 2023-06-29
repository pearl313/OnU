import React from 'react';
import { useState, useEffect } from 'react';
import PillAnalysisHave from './PillAnalysisHave';
import { haveStore } from '../../store/haveStore';
import { makeCombinationStore } from '@/store/makeCombinationStore';
import { useTakingPill, useTakingPillIngredient } from '@/apis/hooks';
import api from '@/apis/config';

type Props = {
  userId: number;
  cancle: boolean;
  renew: () => void;
  makehaveLikeComb: () => void;
};

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

function PillAnalysisHaveBox(props: Props): React.ReactElement {
  const { haveList, setAllHaves } = haveStore();
  const { setFirstNewComb } = makeCombinationStore();
  //복용중 목록 저장
  const [havingList, setHavingList] = useState<Array<have>>([]);

  useEffect(() => {
    console.log(props.userId);
    if (props.userId != null && props.userId !== undefined) {
      getTakingPillData().then((res) => {
        if (res) {
          console.log(res.data.takingNutrientList);
          setHavingList(res.data.takingNutrientList);
          setAllHaves(res.data.takingNutrientList); //전역변수 저장
          const tmp: number[] = [];
          for (
            let i = 0;
            i < res.data.takingNutrientList.length;
            i++
          ) {
            tmp.push(res.data.takingNutrientList[i].nutrientId);
          }
          setFirstNewComb(tmp); //그래프에 복용중인 영양제 처음에 뜰 수 있도록
        }
      });
    }

    // console.log(haveList);
  }, [props.userId]);

  const getTakingPillData = async () => {
    return await api.getTakingPillList(props.userId);
  };

  return (
    <div>
      <div className="flex flex-wrap">
        {havingList &&
          havingList.map((nutrient, idx) => (
            <PillAnalysisHave
              key={idx}
              nutrient={nutrient}
              renew={props.renew}
              cancle={props.cancle}
              makehaveLikeComb={props.makehaveLikeComb}
            />
          ))}
      </div>
      {havingList.length === 0 && (
        <div className="w-100 text-center py-10 mt-2 rounded-md bg-yellow-100">
          복용중인 영양제가 없어요! 마이페이지에서 추가해보세요
        </div>
      )}
    </div>
  );
}

export default PillAnalysisHaveBox;
