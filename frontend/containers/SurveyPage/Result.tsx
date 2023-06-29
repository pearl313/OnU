import React, { useState, useEffect } from 'react';
import surveyStore from '@/store/surveyStore';
import ItemList from '@/components/list/ItemList';
import CompareDrawer from '@/components/common/Drawer';
import SurveyGraph from './SurveyGraph';

type ingredientItem = {
  ingredientName: string;
  nutrientDtoLinkedList: nutrientList[];
};

type nutrientList = {
  interest: boolean;
  nutrientBrand: string;
  nutrientId: number;
  nutrientImageUrl: string;
  nutrientName: string;
};

const Result = () => {
  const [data, setData] = useState<ingredientItem[]>([]);
  const [ingredientId, setIngredientId] = useState<number>(0);
  const [userId, setUserId] = useState<number>();

  useEffect(() => {
    setUserId(
      Number.parseInt(localStorage.getItem('userId') as string),
    );
  }, [ingredientId]);

  useEffect(() => {
    const data = surveyStore.getState().result;
    setData(data.nutrientFiltering);
  }, [userId, ingredientId]);
  console.log(data);

  return (
    <div className="flex flex-col items-center h-full pt-20 space-y-4 text-center">
      <div className="flex flex-col items-start w-[320px] sm:w-[400px]">
        <p className="ml-2 text-xl font-extrabold text-[#1E266E]">
          영양상태 분석
        </p>
        {userId !== undefined ? (
          <div className="w-full mt-2 bg-white rounded-lg">
            <SurveyGraph userId={userId} analysisType={-1} />
          </div>
        ) : null}
      </div>
      <div className="flex flex-col items-start w-[320px] sm:w-[400px]">
        <p className="ml-2 text-xl font-extrabold text-[#1E266E]">
          추천 영양제
        </p>
        <p className="ml-2 text-xs font-light text-[#1E266E] mb-2">
          회원님의 복용중인 제품과 설문 결과를 바탕으로 추천 영양제를
          모아봤어요.
        </p>
      </div>
      <div className="w-[320px] sm:w-[440px]">
        {data.length !== 0 &&
          data.map((item, index: number) => (
            <button
              key={index}
              className="btn btn-sm m-1 bg-[#D8EDFF] rounded-xl border-none text-[#424B5A] active:bg-[#90B5EA] active:text-[#FFFFFF] hover:bg-[#90B5EA] hover:text-[#FFFFFF]"
              onClick={() => setIngredientId(index)}
            >
              {item.ingredientName}
            </button>
          ))}
        <ItemList
          itemList={data[ingredientId]?.nutrientDtoLinkedList}
        />
        <CompareDrawer />
      </div>
    </div>
  );
};

export default Result;
