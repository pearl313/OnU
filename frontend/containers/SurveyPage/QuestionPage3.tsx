// QuestionPage3.tsx
import React, { useEffect, useState } from 'react';

const QuestionPage3: React.FC<QuestionProps> = ({
  question,
  onPreviousPage,
  onNextPage,
  onAnswer,
  answers,
}) => {
  const [pregnant, setPregnant] = useState<string>('');

  useEffect(() => {
    if (answers && answers[3]) {
      setPregnant(answers[3]);
    }
  }, []);

  const handleAnswerChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedPregnant = event.target.value;
    setPregnant(selectedPregnant);
    onAnswer(selectedPregnant);
  };

  return (
    <div className="flex flex-col items-center h-[100vh]">
      <div className="flex flex-col items-center m-10">
        <span className="text-xl font-black">
          혹시 임산부이신가요?
        </span>
        <span className="text-sm text-blue-600/50 mb-4 font-bold">
          {question.surveyQuestion}
        </span>
        <div className="flex flex-row my-2">
          <input
            value="Yes"
            onChange={handleAnswerChange}
            type="radio"
            name="radio-6"
            className="radio radio-warning"
            checked={pregnant === 'Yes'}
          />
          <span>예</span>
        </div>
        <div className="flex flex-row my-2">
          <input
            value="No"
            onChange={handleAnswerChange}
            type="radio"
            name="radio-6"
            className="radio radio-warning"
            checked={pregnant === 'No'}
          />
          <span>아니오</span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2">
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
            disabled={answers[3] === undefined || answers[3] === ''}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage3;
