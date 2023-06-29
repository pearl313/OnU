import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import powder from '../../public/powder.png';
import liquid from '../../public/liquid.png';
import jelly from '../../public/jelly.png';
import capsule from '../../public/capsule.png';
import sphere from '../../public/sphere.png';
import tablet from '../../public/tablet.png';

const pillTypeImages = [
  [powder, '가루'],
  [liquid, '액상'],
  [jelly, '젤리'],
  [capsule, '캡슐'],
  [sphere, '환'],
  [tablet, '정제'],
];

const PillTypeList = (props: {
  onTypeClick: (typenname: any) => void;
  answers: any;
}) => {
  const [clickTypes, setClickTypes] = useState<number[]>([]);

  useEffect(() => {
    setClickTypes(props.answers[5]);
  }, [props.answers[5]]);

  const handleButtonClick = (index: number) => {
    const updatedTypes = clickTypes ? [...clickTypes] : [];

    if (updatedTypes.includes(index + 1)) {
      // 이미 선택된 기능일 경우 제거
      const updatedIndex = updatedTypes.indexOf(index + 1);
      updatedTypes.splice(updatedIndex, 1);
      console.log(updatedIndex);
    } else {
      // 선택되지 않은 기능일 경우 추가
      updatedTypes.push(index + 1);
    }
    setClickTypes(updatedTypes); // 업데이트된 배열을 설정합니다
    props.onTypeClick(updatedTypes); // 최신 배열을 상위 컴포넌트로 전달합니다.
  };
  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-3 gap-3 my-3">
        {pillTypeImages.map((Item, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(index)}
            className={`btn btn-xl rounded-2xl border-none text-[#424B5A] ${
              clickTypes !== undefined &&
              clickTypes.includes(index + 1)
                ? 'bg-[#90B5EA] text-white'
                : 'bg-[#D8EDFF] text-[#424B5A] hover:bg-[#90B5EA] hover:text-white active:bg-[#90B5EA] active:text-white'
            } text-xs w-24 h-24`}
          >
            <div className="box-border col-span-1 hover:box-content">
              <Image
                className="w-[50px] h-[50px] mx-auto mt-2"
                src={Item[0]}
                alt="사진깨짐"
              />
              <div>
                <p className="my-2 text-center">
                  {Item[1] as string}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PillTypeList;
