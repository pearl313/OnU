import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

type Props = {
  nutrient: string | undefined;
  amountA: string;
  amountB: string;
  recommendedIntakeStart: string;
  recommendedIntakeEnd: string;
};

function PillCompareGage(props: Props) {
  const [amountA, setAmoutA] = useState<number>(0);
  const [amountB, setAmoutB] = useState<number>(0);
  const [start, setStart] = useState<number>(0);
  const [end, setEnd] = useState<number>(0);
  const [colorA, setColorA] = useState<string>('');
  const [colorB, setColorB] = useState<string>('');

  useEffect(() => {
    const regex = /[^0-9.]/g;
    if (props) {
      setAmoutA(parseInt(props.amountA?.replace(regex, '')));
      setAmoutB(parseInt(props.amountB?.replace(regex, '')));
      setStart(
        parseInt(props.recommendedIntakeStart?.replace(regex, '')),
      );
      setEnd(
        parseInt(props.recommendedIntakeEnd?.replace(regex, '')),
      );
    }
    // console.log(
    //   props.nutrient +
    //     ' ' +
    //     props.amountA +
    //     ' ' +
    //     props.amountB +
    //     ' ' +
    //     props.recommendedIntakeStart +
    //     ' ' +
    //     props.recommendedIntakeEnd,
    // );
  }, [props]);

  useEffect(() => {
    //수치에 따라 부족/적정/과다
    //부족
    if (amountA < start) {
      setColorA('#FFD465');
    } else if (amountA >= start && amountA <= end) {
      //적정
      setColorA('#79D096');
    } else {
      //과다
      setColorA('#FF793F');
    }
  }, [amountA]);

  useEffect(() => {
    //수치에 따라 부족/적정/과다
    //부족
    if (amountB < start) {
      setColorB('#FFD465');
    } else if (amountB >= start && amountB <= end) {
      //적정
      setColorB('#79D096');
    } else {
      //과다
      setColorB('#FF793F');
    }
  }, [amountB]);

  return (
    <div>
      <div className="grid grid-cols-7 py-2 bg-white">
        <div className="col-span-3">
          <ProgressNutrient
            className="progress"
            value={amountA}
            max={end}
            color={colorA}
            style={{ direction: 'rtl' }}
          ></ProgressNutrient>
          <div className="text-slate-400 font-light text-xs">
            {props.amountA}
          </div>
        </div>
        <div className=" col-span-1 text-center">
          {props.nutrient}
        </div>
        <div className="col-span-3">
          <ProgressNutrient
            className="progress"
            value={amountB}
            max={end}
            color={colorB}
          ></ProgressNutrient>
          <div className="text-right text-slate-400 font-light text-xs">
            {props.amountB}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PillCompareGage;

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
