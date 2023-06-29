import api from '@/apis/config';
import useUserStore from '@/store/userStore';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';

type Props = {
  nutrientId: number;
  reRendering: () => void;
};

function PillReviewForm(props: Props) {
  const [rating, setRating] = useState<number>(5);
  const [reviewContent, setReviewContent] = useState<string>('');

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

  //리뷰 등록 버튼
  const submitReview = async () => {
    console.log(reviewContent);
    console.log(rating);
    const id: number = useUserStore.getState().user?.id as number;
    if (!isNaN(id)) {
      await api
        .addReview(id, props.nutrientId, reviewContent, rating)
        .then((res) => console.log(res))
        .catch((error) =>
          alert(
            '이미 리뷰를 등록하셨습니다. 리뷰는 수정 및 삭제만 가능합니다.',
          ),
        );
    }

    props.reRendering();
  };

  return (
    <div>
      {/* Put this part before </body> tag */}
      <input
        type="checkbox"
        id="my-modal-6"
        className="modal-toggle"
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="text-lg font-bold text-center">
            리뷰 작성하기
          </h3>
          <label
            htmlFor="my-modal-6"
            className="absolute bg-black btn btn-sm btn-circle right-6 top-6"
          >
            ✕
          </label>
          <div className="px-10 mt-10 bg-gray-100">
            <div className="grid grid-cols-2">
              <div className="py-2 pt-5 mt-5 cols-span-1">
                별점을 등록해주세요
              </div>
              <div className="pt-5 mt-5 rating cols-span-1">
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
            <div className="pb-5">
              <p className="pb-2 mt-10">리뷰 작성</p>
              <textarea
                className="w-full textarea textarea-primary"
                placeholder="리뷰를 작성해주세요"
                onChange={setReviewValue}
              ></textarea>
            </div>
          </div>

          <div className="modal-action">
            <label
              htmlFor="my-modal-6"
              className="btn"
              onClick={submitReview}
            >
              등록
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PillReviewForm;
