// QuestionPage6.tsx
import React, { useEffect, useState } from 'react';
import FunctionList from './FuctionList';

const QuestionPage6: React.FC<QuestionProps> = ({
  question,
  onPreviousPage,
  onSubmit,
  onAnswer,
  answers,
}) => {
  const [functionName, setFunctionName] = useState<any>([]);

  useEffect(() => {
    if (answers.length > 0) {
      setFunctionName(answers);
    }
  }, [answers]);

  const handleAnswerChange = (functionName: any) => {
    setFunctionName(functionName);
    onAnswer(functionName);
  };

  return (
    <div className="flex flex-col items-center my-4 h-[100vh]">
      <div className="flex flex-col items-center mx-10 ">
        <span className="text-xl text-center font-black">
          영양제를 먹는 이유가
          <br /> 무엇인가요?
        </span>
        <span className="text-sm text-center text-blue-600/50 mb-3 font-bold">
          {question.surveyQuestion}
        </span>
        <FunctionList
          gender={answers[2]}
          onFunctionClick={handleAnswerChange}
          answers={answers}
        />
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
            onClick={onSubmit}
            className="btn btn-primary btn-radius btn-wide btn-circle antialiased hover:subpixel-antialiased "
            disabled={
              answers[6] === undefined || answers[6].length <= 1
            }
          >
            추천 받기
          </button>
        </div>
      </div>
    </div>
  );
};
export default QuestionPage6;
