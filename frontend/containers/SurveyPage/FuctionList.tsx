import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Eye } from '@emotion-icons/entypo/Eye';

const EyeIcon = styled(Eye)`
  color: #424b5a;
`;

const femaleFunctionName: string[] = [
  '뼈/관절',
  '눈 건강',
  '간 건강',
  '장 건강',
  '면역력 개선',
  '혈행 개선',
  '혈당 조절',
  '콜레스테롤',
  '체지방 감소',
  '항산화',
  '피로 개선',
  '갱년기 여성',
  '질 건강',
];

const maleFunctionName: string[] = [
  '뼈/관절',
  '눈 건강',
  '간 건강',
  '장 건강',
  '면역력 개선',
  '혈행 개선',
  '혈당 조절',
  '콜레스테롤',
  '체지방 감소',
  '항산화',
  '피로 개선',
  '갱년기 남성',
  '정자 운동성',
];

const FunctionList = (props: {
  onFunctionClick: (functionname: any) => void;
  gender: string;
  answers: any;
}) => {
  const [femaleCheck, setFemaleCheck] = useState(false);
  const [maleCheck, setMaleCheck] = useState(false);
  const [functionName, setFunctionName] = useState<string[]>([]);
  const [clickFunctions, setClickFunctions] = useState<number[]>([]);

  useEffect(() => {
    if (props.gender === 'female') {
      setFemaleCheck(true);
      setMaleCheck(false);
      setFunctionName(femaleFunctionName);
    } else {
      setMaleCheck(true);
      setFemaleCheck(false);
      setFunctionName(maleFunctionName);
    }
  }, [props.gender, clickFunctions]);

  useEffect(() => {
    setClickFunctions(props.answers[6]);
  }, [props.answers[6]]);

  const handleButtonClick = (index: number) => {
    const updatedFunctions = clickFunctions
      ? [...clickFunctions]
      : [];
    if (updatedFunctions.includes(index + 1)) {
      // 이미 선택된 기능일 경우 제거
      const updatedIndex = updatedFunctions.indexOf(index + 1);
      updatedFunctions.splice(updatedIndex, 1);
    } else {
      // 선택되지 않은 기능일 경우 추가
      updatedFunctions.push(index + 1);
    }

    setClickFunctions(updatedFunctions); // 업데이트된 배열을 설정합니다.
    props.onFunctionClick(updatedFunctions); // 최신 배열을 상위 컴포넌트로 전달합니다.
  };

  return (
    <div className="flex flex-col items-center">
      <div id="list" className="grid grid-cols-3 my-4 gap-2">
        {functionName.map((item, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(index)}
            className={`btn btn-xl rounded-2xl border-none text-[#424B5A] ${
              clickFunctions !== undefined &&
              clickFunctions.includes(index + 1)
                ? 'bg-[#90B5EA] text-white'
                : 'bg-[#D8EDFF] text-[#424B5A] hover:bg-[#90B5EA] hover:text-white active:bg-[#90B5EA] active:text-white'
            } text-xs w-20 h-20`}
          >
            <div className="flex flex-col items-center">
              <EyeIcon className="w-6 h-6" />
              {item}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FunctionList;
