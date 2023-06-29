import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StarRating = (props: {
  rating: number;
  size?: string;
}): React.ReactElement => {
  const AVR_RATE: number = props.rating * 20;
  const STAR_IDX_ARR = ['first', 'second', 'third', 'fourth', 'last'];
  const [ratesResArr, setRatesResArr] = useState([0, 0, 0, 0, 0]);
  const uniqueId = `_${Math.random().toString(36).substr(2, 9)}`; // 고유한 ID 생성

  const calcStarRates = () => {
    const tempStarRatesArr = [0, 0, 0, 0, 0];
    let starVerScore = (AVR_RATE * 70) / 100;
    let idx = 0;
    while (starVerScore > 14) {
      tempStarRatesArr[idx] = 14;
      idx += 1;
      starVerScore -= 14;
    }
    tempStarRatesArr[idx] = starVerScore;
    setRatesResArr(tempStarRatesArr);
  };
  useEffect(() => {
    calcStarRates();
  }, [AVR_RATE]);

  return (
    <StarRateWrap className="flex flex-nowrap">
      {STAR_IDX_ARR.map(
        (item: string, idx: number): React.ReactElement => {
          const clipPathId = `${item}StarClip${uniqueId}`;
          const starId = `${item}Star${uniqueId}`;
          return (
            <span className="star_icon" key={`${item}_${idx}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                // width="16"
                // height="16"
                width={props.size === 'detail' ? '25' : '16'}
                height={props.size === 'detail' ? '25' : '16'}
                viewBox="0 0 14 12"
                fill="#cacaca"
              >
                <clipPath id={clipPathId}>
                  <rect width={`${ratesResArr[idx]}`} height="39" />
                </clipPath>
                <path
                  id={starId}
                  d="M9,2l2.163,4.279L16,6.969,12.5,10.3l.826,4.7L9,12.779,4.674,15,5.5,10.3,2,6.969l4.837-.69Z"
                  transform="translate(-2 -2)"
                />
                <use
                  clipPath={`url(#${clipPathId})`}
                  href={`#${starId}`}
                  fill={
                    props.size === 'detail' ? '#FFC106' : '#FFE70D'
                  }
                />
              </svg>
            </span>
          );
        },
      )}
    </StarRateWrap>
  );
};

export default StarRating;

const StarRateWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0px 0 0 0px;
`;
