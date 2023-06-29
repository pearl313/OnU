import React from 'react';
// import { PersonCircle } from '@emotion-icons/bootstrap/PersonCircle';
import profile from '../../public/profile.png';
import Image from 'next/image';
import fillStar from '../../public/fillStar.png';
import emptyStar from '../../public/emptyStar.png';
import { userAgent } from 'next/server';
type Props = {
  review: reviewContents;
};

type reviewContents = {
  userNickname: string;
  nutrientName: string;
  reviewContent: string;
  userAge: number;
  userGender: string;
  reviewScore: number;
  reviewCreateTime: string;
  reviewUpdateTime: string;
};

function PillDetailReviewBox(props: Props) {
  console.log(props.review.userAge);

  const age = Math.floor(props.review.userAge / 10) * 10;
  let gender = '';
  if (props.review.userGender === 'm') {
    gender = '남';
  } else {
    gender = '여';
  }

  function repeatStar(score: number): JSX.Element[] {
    const arr = [];
    for (let i = 0; i < score; i++) {
      arr.push(
        <p>
          <Image src={fillStar} alt="fillStar" className="w-4 h-4" />
        </p>,
      );
    }
    for (let i = 0; i < 5 - score; i++) {
      arr.push(
        <p>
          <Image
            src={emptyStar}
            alt="emptyStar"
            className="w-4 h-4"
          />
        </p>,
      );
    }

    return arr;
  }

  return (
    <div className="bg-white min-h-[60px] px-5 py-30 rounded-lg mt-4">
      <div className="grid sm:grid-cols-8 grid-cols-12 pt-6">
        <div className="w-10 sm:col-span-1 col-span-2 pt-0.5">
          <Image src={profile} className="w-10 h-10" alt="프로필" />
        </div>
        <div className="sm:col-span-4 col-span-6 pb-1">
          <div className="text-xl">{props.review.userNickname}</div>
          <div className="text-sm">
            {age}대 {gender}성
          </div>
        </div>
        <div className="sm:col-span-3 col-span-4 grid justify-items-end">
          <div className="text-sm">
            {props.review.reviewCreateTime.slice(0, 10)}
          </div>
          <div className="flex">
            {repeatStar(props.review.reviewScore)}
          </div>
        </div>
      </div>
      <hr />
      <div className="my-3 pb-5 ">{props.review.reviewContent}</div>
    </div>
  );
}

export default PillDetailReviewBox;
