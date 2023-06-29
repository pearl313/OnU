//고민별로 되어있지만 기능별입니다 나중에 고칠게요

import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Eye } from '@emotion-icons/entypo/Eye';
import ItemList from '@/components/list/ItemList';
import axios from 'axios';
import { BASE_URL } from '@/apis/axios';

const EyeIcon = styled(Eye)`
  color: #424b5a;
`;

const worryDataList: string[] = [
  '뼈/관절',
  '눈 건강',
  '간 건강',
  '장 건강',
  '면역력 개선',
  '혈행 개선',
  '혈당 조절',
  '콜레스테롤',
  '체지방 감소',
  '항산화',
  '피로 개선',
  '갱년기 여성',
  '갱년기 남성',
  '질 건강',
  '정자 운동성',
];

type Item = {
  nutrientId: number;
  nutrientName: string;
  nutrientImageUrl: string;
  nutrientBrand: string;
  isInterested: boolean;
};

const WorryCategoryList = () => {
  const [itemData, setItemData] = useState<Item[]>([]);
  const [functionId, setFunctionId] = useState<number>(
    Math.ceil(Math.random() * 15),
  );
  const [userId, setUserId] = useState<number>(0);

  useEffect(() => {
    if (localStorage.getItem('userData')) {
      const userData: string | null =
        localStorage.getItem('userData');
      if (userData !== null)
        setUserId(Number.parseInt(JSON.parse(userData).id));
    }

    axios
      .get(
        `${BASE_URL}/nutrient/function/${functionId}?userId=${userId}`,
      )
      .then((res) => {
        console.log(res.data);
        setItemData(res.data.reviewListByNutrient);
      });
  }, [userId, functionId]);

  return (
    <div>
      <div id="list" className="flex flex-wrap mt-4 ml-4">
        {worryDataList.map((item, index) => (
          <button
            key={index}
            className="btn btn-xl m-2 bg-[#D8EDFF] rounded-2xl border-none text-[#424B5A]  active:bg-[#90B5EA] active:text-[#FFFFFF] hover:bg-[#90B5EA] hover:text-[#FFFFFF] text-xs w-24 h-20"
            onClick={() => setFunctionId(index + 1)}
          >
            <div className="flex flex-col items-center">
              <EyeIcon className="w-6 h-6" />
              {item}
            </div>
          </button>
        ))}
      </div>
      <ItemList itemList={itemData} />
    </div>
  );
};

export default WorryCategoryList;
