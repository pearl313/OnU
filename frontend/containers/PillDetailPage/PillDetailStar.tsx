import React from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
// import { fillFiveStar } from '../../public/fillFiveStar.png';
// import { emptyFiveStar } from '../../public/emptyFiveStar.png';

type Props = {
  starRate: number;
};

// const StarFillComponent = styled(StarFill)``;

function PillDetailStar(props: Props) {
  return (
    <div>
      {/* <div
        className="z-1000 ml-[55px] mr-[10px] h-[19px] overflow-hidden"
        style={{ width: '100px' }}
      >
        <Image
          className="z-10 h-[19px] w-[100px]"
          src={fillFiveStar}
          alt="사진깨짐"
        />
      </div>
      <Image
        className="absolute ml-[84px] w-[100px] h-[19px]"
        src={fillFiveStar}
        alt="사진깨짐"
      /> */}
    </div>
  );
}

export default PillDetailStar;
