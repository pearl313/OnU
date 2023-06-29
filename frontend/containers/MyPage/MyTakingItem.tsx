import React from 'react';
import api from '@/apis/config';
import Image from 'next/image';

import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useRouter } from 'next/navigation';

const MyTakingItem = (props: {
  item: Item;
  id: number;
}): React.ReactElement => {
  const router = useRouter();

  const handleTaking = (itemId: number): void => {
    if (window.confirm('복용중인 영양제에서 제거하시겠습니까?')) {
      try {
        api.deleteTakingPill(props.id, itemId).then(() => {
          console.log('제거되었습니다.');
        });
      } catch (error: any) {
        console.log(error);
        alert('제거에 실패했습니다. 다시 시도해주세요');
      } finally {
        router.refresh();
      }
    }
  };

  return (
    <div className="indicator">
      <div className="text-[#90B5EA] border-none bg-opacity-0 indicator-item badge top-2 right-2">
        <button onClick={() => handleTaking(props.item.nutrientId)}>
          <RemoveCircleOutlineIcon />
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

export default MyTakingItem;
