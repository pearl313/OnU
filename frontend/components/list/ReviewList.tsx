import Image from 'next/image';
import React from 'react';
import StarRating from '@/components/common/StarRating';
import { useRouter } from 'next/navigation';

const ItemList = (props: {
  itemList: Array<Review>;
}): React.ReactElement => {
  const router = useRouter();
  return (
    <div id="item-list">
      {props.itemList.map(
        (item: Review, index: number): React.ReactElement => (
          <div
            id="item"
            className="flex justify-start w-full my-4 min-h-28"
            key={index}
          >
            <div className="flex flex-col w-48">
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

            <div className="flex flex-col justify-around w-full m-2">
              <div id="review" className="flex flex-col">
                <span
                  id="review-content"
                  className="text-base font-base text-[#3A3A3A]"
                >
                  {item.reviewContent}
                </span>
                <StarRating rating={item.reviewScore} />
              </div>
              <div
                id="buttons"
                className="flex justify-end space-x-2"
              >
                <button
                  id="update-btn"
                  className="btn btn-sm border-none text-[#909090] btn-outline"
                >
                  수정
                </button>
                <button
                  id="delete-btn"
                  className="btn btn-sm border-none text-[#909090] btn-outline"
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        ),
      )}
    </div>
  );
};

export default ItemList;
