import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

type Props = {
  ingredientName: string;
  ingredientAmount: string;
  recommendedIntakeStart: string | number;
  recommendedIntakeEnd: string | number;
};

function PillDetailNutrientGage(props: Props) {
  const [amount, setAmout] = useState<number>(0);
  const [start, setStart] = useState<number>(0);
  const [end, setEnd] = useState<number>(0);
  const [color, setColor] = useState<string>('');

  useEffect(() => {
    const regex = /[^0-9.]/g;
    setAmout(parseInt(props.ingredientAmount?.replace(regex, '')));
    if (
      typeof props.recommendedIntakeStart == 'string' &&
      typeof props.recommendedIntakeEnd == 'string'
    ) {
      setStart(
        parseInt(props.recommendedIntakeStart?.replace(regex, '')),
      );
      setEnd(
        parseInt(props.recommendedIntakeEnd?.replace(regex, '')),
      );
    } else if (
      typeof props.recommendedIntakeStart == 'number' &&
      typeof props.recommendedIntakeEnd == 'number'
    ) {
      setStart(props.recommendedIntakeStart);
      setEnd(props.recommendedIntakeEnd);
    }
  }, [props]);

  useEffect(() => {
    //수치에 따라 부족/적정/과다
    //부족
    if (amount < start) {
      setColor('#FFD465');
    } else if (amount >= start && amount <= end) {
      //적정
      setColor('#79D096');
    } else {
      //과다
      setColor('#FF793F');
    }
  }, [amount]);

  return (
    <div className="mt-1">
      <div className="flex justify-between">
        <div className="grid content-center col-span-2 mr-2 text-sm">
          {props.ingredientName}
        </div>
        <div className="text-sm text-gray-400">
          {props.ingredientAmount}
        </div>
      </div>
      <ProgressNutrient
        className="w-full col-span-10 mb-3 bg-red-200 progress rounded-xl"
        value={amount}
        max={end}
        color={color}
      ></ProgressNutrient>
    </div>
  );
}

export default PillDetailNutrientGage;

const ProgressNutrient = styled.progress`
  appearance: none;
  background-color: #D9D9D9;
  :&::-webkit-progress-bar {
  }

  &::-webkit-progress-value {
    border-radius: 40px;
    background: ${(props) => props.color};
  }
`;
