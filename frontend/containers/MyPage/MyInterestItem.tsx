import api from '@/apis/config';
import Image from 'next/image';
import React, { useState } from 'react';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { useRouter } from 'next/navigation';

const MyInterestItem = (props: {
  item: Item;
  id: number;
}): React.ReactElement => {
  const [isInterested, setIsInterested] = useState<boolean>(true);
  const router = useRouter();

  const handleInterest = (itemId: number): void => {
    if (window.confirm('관심 영양제로 추가하시겠습니까?')) {
      try {
        api.addInterestPill(props.id, itemId);
        setIsInterested(true);
      } catch (error) {
        console.log(error);
      } finally {
        router.refresh();
      }
    }
  };

  const removeInterest = (itemId: number): void => {
    if (window.confirm('관심 영양제 목록에서 제거하시겠습니까?')) {
      try {
        api.deleteInterestPill(props.id, itemId);
        setIsInterested(false);
      } catch (error) {
        console.log(error);
      } finally {
        router.refresh();
      }
    }
  };

  const handleTaking = (itemId: number): void => {
    if (window.confirm('복용중인 영양제로 추가하시겠습니까?')) {
      try {
        api.addTakingPill(props.id, itemId).then(() => {
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
  };

  return (
    <div className="indicator">
      {isInterested ? (
        <div className="text-red-500 bg-opacity-0 border-none indicator-item badge top-2 right-8">
          <button
            onClick={() => removeInterest(props.item.nutrientId)}
          >
            <FavoriteIcon />
          </button>
        </div>
      ) : (
        <div className="text-red-500 bg-opacity-0 border-none indicator-item badge top-2 right-8">
          <button
            onClick={() => handleInterest(props.item.nutrientId)}
          >
            <FavoriteBorderIcon />
          </button>
        </div>
      )}

      <div className="text-[#90B5EA] border-none bg-opacity-0 indicator-item badge top-2 right-2">
        <button onClick={() => handleTaking(props.item.nutrientId)}>
          <AddCircleOutlineRoundedIcon />
        </button>
      </div>

      <div
        id="item"
        className="flex flex-col items-center w-[140px] sm:w-[180px] my-4 min-h-28"
        style={{ cursor: 'pointer' }}
      >
        <div
          id="item-img"
          className="mask mask-square w-[100px] h-[120px]"
        >
          <Image
            src={props.item.nutrientImageUrl}
            alt="item-img"
            width={100}
            height={100}
            style={{
              objectFit: 'fill',
            }}
            onClick={() =>
              router.push(
                `/pilldetail/pill-detail?id=${props.item.nutrientId}`,
              )
            }
          />
        </div>
        <div id="item-info" className="flex flex-col items-center">
          <span
            id="manufacturer"
            className="text-xs font-bold text-[#909090]"
          >
            {props.item.nutrientBrand}
          </span>
          <span
            id="name"
            className="text-sm font-extrabold text-[#3A3A3A]"
          >
            {props.item.nutrientName}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MyInterestItem;
