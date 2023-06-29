import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import api from '@/apis/config';

const ItemList = (props: {
  itemList: Array<Item>;
}): React.ReactElement => {
  // const itemDataList = props.data;
  const router = useRouter();

  useEffect(() => {
    console.log(props.itemList);
  }, [props]);

  // const handleInterest = (itemId: number): void => {
  //   if (window.confirm('관심 영양제로 추가하시겠습니까?')) {
  //     try {
  //       api.addInterestPill(id, itemId);
  //       router.reload();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  // const removeInterest = (itemId: number): void => {
  //   if (window.confirm('관심 영양제 목록에서 제거하시겠습니까?')) {
  //     try {
  //       api.deleteInterestPill(id, itemId);
  //       router.reload();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  const handleTaking = (itemId: number): void => {
    const id = localStorage.getItem('userId');
    if (window.confirm('복용중인 영양제로 추가하시겠습니까?')) {
      if (id !== null) {
        try {
          api.addTakingPill(parseInt(id), itemId).then(() => {
            alert('추가되었습니다.');
          });
        } catch (error: any) {
          console.log(error);
          if (error.data.message === 'duplicated') {
            alert('이미 복용중인 영양제입니다.');
          } else {
            alert('등록에 실패했습니다. 다시 시도해주세요');
          }
        }
      }
    }
  };

  return (
    <div className="grid grid-cols-2 space-y-2 w-[320px] sm:w-[400px] bg-white shadow-lg text-xs font-base text-[#909090] rounded-md items-baseline px-4 space-x-4">
      {props.itemList?.map((item: Item, index: number) => (
        <div className="indicator">
          <div
            id="item"
            className="flex flex-col items-center w-[120px] sm:w-[160px] my-4 min-h-28"
            key={index}
            style={{ cursor: 'pointer' }}
          >
            {/* {item.isInterested ? (
              <div className="text-red-500 bg-opacity-0 border-none indicator-item badge top-2 right-8">
                <button
                  onClick={() => removeInterest(item.nutrientId)}
                >
                  <FavoriteIcon />
                </button>
              </div>
            ) : (
              <div className="text-red-500 bg-opacity-0 border-none indicator-item badge top-2 right-8">
                <button
                  onClick={() => handleInterest(item.nutrientId)}
                >
                  <FavoriteBorderIcon />
                </button>
              </div>
            )} */}
            <div className="text-[#90B5EA] border-none bg-opacity-0 indicator-item badge top-2 right-2">
              <button onClick={() => handleTaking(item.nutrientId)}>
                <AddIcon />
              </button>
            </div>
            <div id="item-img" className="mask mask-square">
              <Image
                src={item.nutrientImageUrl}
                alt="item-img"
                width={100}
                height={100}
                onClick={() =>
                  router.push(
                    `/pilldetail/pill-detail?id=${item.nutrientId}`,
                  )
                }
              />
            </div>
            <div
              id="item-info"
              className="flex flex-col items-center"
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
