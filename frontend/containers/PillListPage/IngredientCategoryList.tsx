import { BASE_URL } from '@/apis/axios';
import { itemDataList } from '@/apis/data';
import ItemList from '@/components/list/ItemList';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';

const ingredientDataList: string[] = [
  '칼슘',
  '철분',
  '아연',
  '요오드',
  '마그네슘',
  '엽산',
  '루테인',
  '오메가3',
  '비타민A',
  '비타민B',
  '비타민C',
  '비타민D',
  '비타민E',
  '프로바이오틱스',
  '홍삼/인삼',
  '코엔자임Q10',
];

type Item = {
  nutrientId: number;
  nutrientName: string;
  nutrientImageUrl: string;
  nutrientBrand: string;
  isInterested: boolean;
};

const IngredientCategoryList = () => {
  const [itemData, setItemData] = useState<Item[]>([]);
  const [ingredientId, setIngredientId] = useState<number>(
    Math.ceil(Math.random() * 16),
  );
  const [userId, setUserId] = useState<number>(0);
  const [activeButton, setActiveButton] = useState<number>(0); // New state

  useEffect(() => {
    if (localStorage.getItem('userData')) {
      const userData: string | null =
        localStorage.getItem('userData');
      if (userData !== null)
        setUserId(Number.parseInt(JSON.parse(userData).id));
    }

    axios
      .get(
        `${BASE_URL}/nutrient/ingredient/${ingredientId}?userId=${userId}`,
      )
      .then((res) => {
        console.log(res.data);
        setItemData(res.data.nutrientListByIngreidientList);
      });
  }, [userId, ingredientId]);

  return (
    <div>
      <div
        id="list"
        className="flex flex-wrap justify-start mt-4 ml-4"
      >
        {ingredientDataList.map((item, index) => (
          <button
            key={index}
            className={`btn btn-sm m-1 rounded-xl border-none text-[#424B5A] ${
              activeButton === index
                ? 'bg-[#90B5EA] text-[#FFFFFF]'
                : 'bg-[#D8EDFF] hover:bg-[#90B5EA] hover:text-[#FFFFFF]'
            }`}
            onClick={() => {
              setIngredientId(index + 1);
              setActiveButton(index); // Update the active button
            }}
          >
            {item}
          </button>
        ))}
      </div>
      {itemData.length != 0 ? (
        <ItemList itemList={itemData} />
      ) : (
        <div className="flex justify-center pt-6">
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="48"
            visible={true}
          />
        </div>
      )}
    </div>
  );
};

export default IngredientCategoryList;
