// QuestionPage2.tsx
import React, { useEffect, useState } from 'react';

const QuestionPage2: React.FC<QuestionProps> = ({
  question,
  onPreviousPage,
  onNextPage,
  onAnswer,
  answers,
}) => {
  const [gender, setGender] = useState<string>('');

  useEffect(() => {
    if (answers && answers[2]) {
      setGender(answers[2]);
    }
  }, [answers]);

  const handleAnswerChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedGender = event.target.value;
    setGender(selectedGender);
    onAnswer(selectedGender);
  };

  return (
    <div className="grid grid-cols-1 place-items-center h-[75vh] overflow-hidden ">
      <div className="grid justify-center mb-20 content-center mb-20">
        <span className="text-2xl text-center font-black">
          {question.surveyQuestion}
        </span>
        <span className="text-sm text-center text-blue-600/50 my-2 font-bold">
          성별에 따라 추천 영양성분이 달라져요
        </span>
        <div className="space-y-3 mt-2">
          <div className="flex flex-row space-x-20">
            <div>
              <input
                value="male"
                onChange={handleAnswerChange}
                type="radio"
                name="radio-6"
                className="radio radio-warning"
                checked={gender === 'male'}
              />
            </div>
            <div>남성</div>
          </div>
          <div className="flex flex-row space-x-20">
            <input
              value="female"
              onChange={handleAnswerChange}
              type="radio"
              name="radio-6"
              className="radio radio-warning"
              checked={gender === 'female'}
            />
            <span>여성</span>
          </div>
        </div>
      </div>
      <div className="grid justify-center fixed bottom-14 space-y-2">
        <div>
          <button
            onClick={onPreviousPage}
            className="btn btn-primary btn-radius btn-wide btn-circle antialiased hover:subpixel-antialiased "
          >
            이전
          </button>
        </div>
        <div>
          <button
            onClick={onNextPage}
            className="btn btn-primary btn-radius btn-wide btn-circle antialiased hover:subpixel-antialiased "
            disabled={answers[2] === undefined || answers[2] === ''}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};
export default QuestionPage2;
