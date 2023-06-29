import api from '@/apis/config';
import { itemStore } from '@/store/itemStore';
import useUserStore from '@/store/userStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const ItemList = (props: {
  itemList: Array<Item>;
}): React.ReactElement => {
  // const itemDataList = props.data;
  const { items, setItems } = itemStore();
  const router = useRouter();

  const compareItems = (item: Item) => {
    if (items.length < 2) {
      setItems(item);
    }
  };

  const id = useUserStore.getState().user?.id as number;

  const handleInterest = (itemId: number): void => {
    if (window.confirm('관심 영양제로 추가하시겠습니까?')) {
      try {
        api.addInterestPill(id, itemId).then((res) => {
          alert('추가되었습니다.');
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const removeInterest = (itemId: number): void => {
    if (window.confirm('관심 영양제 목록에서 제거하시겠습니까?')) {
      try {
        api.deleteInterestPill(id, itemId).then((res) => {
          alert('제거되었습니다.');
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div id="item-list">
      {props.itemList?.map(
        (item: Item, index: number): React.ReactElement => {
          const isSelected = items.some(
            (i) => i.nutrientId === item.nutrientId,
          );
          return (
            <div
              id="item"
              className={`flex justify-start w-full my-4 min-h-28 p-0.5 ${
                isSelected ? 'ring-2 rounded-md' : ''
              }`}
              key={index}
            >
              <div
                id="item-img"
                className="cursor-pointer mask mask-square"
              >
                <Image
                  src={item.nutrientImageUrl}
                  alt="item-img"
                  width={140}
                  height={100}
                  onClick={() =>
                    router.push(
                      `/pilldetail/pill-detail?id=${item.nutrientId}`,
                    )
                  }
                />
              </div>
              <div className="flex flex-col justify-between w-full m-2">
                <div
                  id="item-info"
                  className="flex flex-col items-start"
                >
                  <span
                    id="manufacturer"
                    className="text-xs font-bold text-[#909090]"
                  >
                    {item.nutrientBrand}
                  </span>
                  <span
                    id="name"
                    className="text-sm font-extrabold text-[#3A3A3A]"
                  >
                    {item.nutrientName}
                  </span>
                </div>
                <div
                  id="buttons"
                  className="flex justify-end space-x-2"
                >
                  <button
                    id="compare-btn"
                    className="btn btn-sm border-[#90B5EA] text-[#90B5EA] btn-outline"
                    onClick={() => compareItems(item)}
                  >
                    비교하기
                  </button>
                  {!item.interested ? (
                    <button
                      id="add-btn"
                      className="btn btn-sm border-[#90B5EA] text-[#90B5EA] btn-outline"
                      onClick={() => handleInterest(item.nutrientId)}
                    >
                      관심목록 추가
                    </button>
                  ) : (
                    <button
                      id="add-btn"
                      className="btn btn-sm border-[#90B5EA] text-[#90B5EA] btn-outline"
                      onClick={() => removeInterest(item.nutrientId)}
                    >
                      관심목록 제거
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        },
      )}
    </div>
  );
};

export default ItemList;
