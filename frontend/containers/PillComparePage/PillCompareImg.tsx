import React from 'react';
import Image from 'next/image';
import powder from '../../public/powder.png';
import liquid from '../../public/liquid.png';
import jelly from '../../public/jelly.png';
import capsule from '../../public/capsule.png';
import sphere from '../../public/sphere.png';
import tablet from '../../public/tablet.png';

type Props = {
  subject: string;
  first: string;
  second: string;
};

function PillCompareImg(props: Props) {
  const pillTypeImage = [
    powder,
    powder,
    liquid,
    jelly,
    capsule,
    sphere,
    tablet,
  ];

  const whatType = (type: string): number => {
    let num = 0;

    switch (type) {
      case '가루':
        num = 1;
        break;
      case '액상':
        num = 2;
        break;
      case '젤리':
        num = 3;
        break;
      case '캡슐':
        num = 4;
        break;
      case '환':
        num = 5;
        break;
      case '정':
        num = 6;
        break;
    }

    return num;
  };

  return (
    <div className="mb-6">
      <hr className="mx-4" />
      <div className="grid py-4 mx-4 bg-white tabs justify-items-center">
        <div className="font-semibold">{props.subject}</div>
      </div>
      <hr className="mx-4" />
      <div className="mx-4">
        <div className="grid grid-cols-2 py-2">
          <div className="col-span-1 mr-2 bg-white border rounded-lg">
            <div className="grid justify-center my-5">
              <Image
                className="w-10 h-10"
                src={pillTypeImage[whatType(props.first)]}
                alt="사진깨짐"
              />
              <div className="mt-1 ml-1">{props.first}</div>
            </div>
          </div>
          <div className="col-span-1 ml-2 bg-white border rounded-lg">
            <div className="grid justify-center my-5">
              <Image
                className="w-10 h-10"
                src={pillTypeImage[whatType(props.second)]}
                alt="사진깨짐"
              />
              <div className="mt-1 ml-1">{props.second}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PillCompareImg;
