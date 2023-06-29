import React, { useEffect } from 'react';

// 설문에 답한 정도 보여주기
const QuestionGauge = (props: {
  currentQuestionIndex: number;
  male: boolean;
}) => {
  useEffect(() => {
    // currentQuestionIndex 상태가 변경될 때 실행되는 코드
  }, [props.currentQuestionIndex]);

  return (
    <div className="grid justify-center">
      <div>
        <ul className="steps mt-20 text-xs/[15px] font-semibold antialiased hover:subpixel-antialiased flex justify-center">
          <li
            className={`step ${
              props.currentQuestionIndex >= 0 ? 'step-primary' : ''
            }`}
          >
            나이
          </li>
          <li
            className={`step ${
              props.currentQuestionIndex >= 1 ? 'step-primary' : ''
            }`}
          >
            성별
          </li>
          {props.male === false && (
            <li
              className={`step ${
                props.currentQuestionIndex >= 2 ? 'step-primary' : ''
              }`}
            >
              임신 및<br />
              수유 여부
            </li>
          )}
          <li
            className={`step ${
              props.currentQuestionIndex >= 3 ? 'step-primary' : ''
            }`}
          >
            복용 중인
            <br />
            영양제
          </li>
          <li
            className={`step ${
              props.currentQuestionIndex >= 4 ? 'step-primary' : ''
            }`}
          >
            선호 제형
          </li>
          <li
            className={`step ${
              props.currentQuestionIndex >= 5 ? 'step-primary' : ''
            }`}
          >
            섭취 목적
          </li>
        </ul>
      </div>
    </div>
  );
};

export default QuestionGauge;
