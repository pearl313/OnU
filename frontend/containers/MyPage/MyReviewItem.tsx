import { useEffect, useState } from 'react';
import api from '@/apis/config';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { AxiosResponse } from 'axios';

import StarRating from '@/components/common/StarRating';

const MyReviewItem = (props: {
  item: Review;
  fetchReviews: (id: number) => void;
}): React.ReactElement => {
  const router = useRouter();
  const [wantReview, setWantReview] = useState<boolean>();
  const [userId, setUserId] = useState<number>();

  const [rating, setRating] = useState<number>(5);
  const [reviewContent, setReviewContent] = useState<string>('');

  useEffect(() => {
    setUserId(
      Number.parseInt(localStorage.getItem('userId') as string),
    );
  }, []);

  const updateReview = (
    reviewId: number,
    reviewContent: string,
    reviewScore: number,
  ) => {
    if (userId !== undefined && reviewContent !== '') {
      api
        .updateReview(userId, reviewId, reviewContent, reviewScore)
        .then(() => {
          props.fetchReviews(userId);
        });
    }

    setWantReview(false);
  };

  const deleteReview = (reviewId: number) => {
    if (
      window.confirm('리뷰를 제거하시겠습니까?') &&
      userId !== undefined
    ) {
      api.deleteReview(userId, reviewId).then(() => {
        props.fetchReviews(userId);
      });
    }
  };

  const handleStarClick = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>,
  ) => {
    const target = e.target as HTMLInputElement;
    setRating(Number(target.value));
  };

  const setReviewValue = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setReviewContent(e.target.value);
  };

  return (
    <div
      id="item"
      className="flex justify-start items-center w-[300px] sm:w-full my-4 min-h-28"
    >
      <div className="flex flex-col items-center w-32">
        <div id="item-img" className="mask mask-square">
          <Image
            src={props.item.nutrientImageUrl}
            alt="item-img"
            width={100}
            height={100}
            onClick={() =>
              router.push(
                `/pilldetail/pill-detail?id=${props.item.nutrientId}`,
              )
            }
          />
        </div>
        <div
          id="item-info"
          className="flex flex-col items-center px-4 whitespace-pre-wrap"
        >
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

      {wantReview ? (
        <div className="w-64 p-2 m-2">
          <div className="grid grid-cols-2">
            <div className="cols-span-1">별점을 등록해주세요</div>
            <div className="rating cols-span-1">
              <input
                type="radio"
                name="rating-2"
                className="w-10 bg-orange-400 mask mask-star-2"
                value="1"
                onClick={handleStarClick}
              />
              <input
                type="radio"
                name="rating-2"
                className="w-10 bg-orange-400 mask mask-star-2"
                value="2"
                onClick={handleStarClick}
              />
              <input
                type="radio"
                name="rating-2"
                className="w-10 bg-orange-400 mask mask-star-2"
                value="3"
                onClick={handleStarClick}
              />
              <input
                type="radio"
                name="rating-2"
                className="w-10 bg-orange-400 mask mask-star-2"
                value="4"
                onClick={handleStarClick}
              />
              <input
                type="radio"
                name="rating-2"
                className="w-10 bg-orange-400 mask mask-star-2"
                value="5"
                onClick={handleStarClick}
              />
            </div>
          </div>
          <div className="pt-2">
            <textarea
              className="w-full textarea textarea-primary"
              placeholder="리뷰를 작성해주세요"
              onChange={setReviewValue}
            ></textarea>
          </div>
          <div className="flex justify-end mb-0">
            <button
              id="update-btn"
              className="btn btn-sm border-none text-[#909090] btn-outline"
              onClick={() =>
                updateReview(
                  props.item.reviewId,
                  reviewContent,
                  rating,
                )
              }
            >
              수정
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-around w-64 m-2">
          <div id="review" className="flex flex-col">
            <span
              id="review-content"
              className="text-base font-base text-[#3A3A3A]"
            >
              {props.item.reviewContent}
            </span>
            <StarRating rating={props.item.reviewScore} />
          </div>
          <div id="buttons" className="flex justify-end space-x-1">
            <button
              id="update-btn"
              className="btn btn-sm border-none text-[#909090] btn-outline"
              onClick={() => setWantReview(true)}
            >
              수정
            </button>
            <button
              id="delete-btn"
              className="btn btn-sm border-none text-[#909090] btn-outline"
              onClick={() => deleteReview(props.item.reviewId)}
            >
              삭제
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReviewItem;
