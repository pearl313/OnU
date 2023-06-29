import React, { useCallback, useEffect, useState } from 'react';
import yellowCircle from '../../public/yellowCircle.png';
import greenCircle from '../../public/greenCircle.png';
import redCircle from '../../public/redCircle.png';
import Image from 'next/image';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { makeCombinationStore } from '@/store/makeCombinationStore';
import api from '@/apis/config';
import { haveStore } from '@/store/haveStore';
import { combinationStore } from '@/store/combinationStore';
import PillDetailNutrientGage from '../PillDetailPage/PillDetailNutrientGage';

type Props = {
  userId: number;
  analysisType: number;
};

type ingredient = {
  nutrientName: string;
  nutrientAmount: string;
  nutrientMin: number;
  nutrientMax: number;
};

function PillAnalysisGraph(props: Props) {
  const [analysisList, setAnalysisList] = useState<Array<number>>([]);
  const { haveList } = haveStore();
  const { combinations } = combinationStore();
  const { combList } = makeCombinationStore(); //zstand에 들어있는 combList에서 영양제 id 가져옴
  const [ingredientList, setIngredientList] = useState<
    Array<ingredient>
  >([]);

  const getAnalysisData = useCallback(async () => {
    try {
      const res = await api.getIngredientListByCombination(
        props.userId,
        analysisList,
      );
      if (res && res.data && res.data.nutrientIngredient) {
        setIngredientList(res.data.nutrientIngredient);
      }
    } catch (error) {
      console.error(error);
    }
  }, [props.userId, analysisList]);

  useEffect(() => {
    // console.log(combinations);
    // console.log('이번 그래프는? ' + props.analysisType);
    let tmpArr: number[] = [];

    if (props.analysisType === -1) {
      for (let i = 0; i < haveList.length; i++) {
        tmpArr.push(haveList[i].nutrientId);
      }
    } else if (props.analysisType === -3) {
      //-3이 들어오면 tmp에 아무것도 넣지 않음
    } else if (props.analysisType === -2) {
      tmpArr = Array.from(combList);
    } else {
      const tmp: any = combinations[0];

      for (let i = 0; i < tmp.length; i++) {
        if (tmp[i].combinationId === props.analysisType) {
          const onlyNutrient = tmp[i].nutrientInfoList;
          onlyNutrient.forEach((nutrient: any) => {
            tmpArr.push(nutrient.nutrientId);
          });
        }
      }
    }

    setAnalysisList(tmpArr);
    console.log(tmpArr);
  }, [
    props.analysisType,
    props.userId,
    haveList,
    combList,
    combinations,
  ]);

  useEffect(() => {
    if (props.userId !== undefined) {
      getAnalysisData();
    }
  }, [props.userId, getAnalysisData]);

  return (
    <div>
      {analysisList.length === 0 ? (
        <div className="w-100 text-center py-10 mt-2 mb-5 rounded-md bg-yellow-50">
          복용중 / 관심 영양제를 클릭해서 새로운 조합을 만들어보세요!
        </div>
      ) : (
        <div>
          <div className="bg-white px-5 py-30 rounded-lg mt-3 min-h-[140px]">
            <div className="mt-5">
              <div className="flex flex-row-reverse my-1 pt-4">
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
                {ingredientList &&
                  ingredientList.map((nutrient, idx) => (
                    <PillDetailNutrientGage
                      key={idx}
                      ingredientName={nutrient.nutrientName}
                      ingredientAmount={nutrient.nutrientAmount}
                      recommendedIntakeStart={nutrient.nutrientMin}
                      recommendedIntakeEnd={nutrient.nutrientMax}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PillAnalysisGraph;
