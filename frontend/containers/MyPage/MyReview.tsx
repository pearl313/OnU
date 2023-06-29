import { useEffect, useState } from 'react';
import api from '@/apis/config';

import MyReviewItem from './MyReviewItem';

//내가 쓴 리뷰 리스트
const Review = (): React.ReactElement => {
  const [userId, setUserId] = useState<number>();
  const [itemData, setItemData] = useState<Review[]>([]);

  useEffect(() => {
    setUserId(
      Number.parseInt(localStorage.getItem('userId') as string),
    );
  }, []);

  useEffect(() => {
    if (userId !== null && userId !== undefined) {
      fetchReviews(userId);
    }
  }, [userId]);

  const fetchReviews = async (id: number) => {
    const res = await api.getReviewList(id);
    if (res?.data?.myReviewList) {
      setItemData(res.data.myReviewList);
    }
  };

  return (
    <div>
      <p className="ml-2 text-xl font-extrabold text-[#1E266E] mb-2">
        내가 쓴 리뷰
      </p>
      <div className="flex flex-col items-center w-[320px] sm:w-[400px] bg-white shadow-lg text-xs font-base text-[#909090] rounded-md">
        <div id="item-list">
          {itemData.length !== 0 ? (
            itemData.map(
              (item: Review): React.ReactElement => (
                <MyReviewItem
                  item={item}
                  fetchReviews={fetchReviews}
                />
              ),
            )
          ) : (
            <div className="my-2">
              <span>아직 작성한 리뷰가 없습니다.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Review;
