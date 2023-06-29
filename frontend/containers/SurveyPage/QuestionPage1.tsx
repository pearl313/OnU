// QuestionPage1.tsx
import React, { useEffect, useState } from 'react';

const QuestionPage1: React.FC<QuestionProps> = ({
  question,
  onNextPage,
  onAnswer,
  answers,
}) => {
  const [keyword, setKeyword] = useState<string>('');
  const [showValidMessage, setShowValidMessage] =
    useState<boolean>(false);
  const [showWithinMessage, setShowWithiMessage] =
    useState<boolean>(false);

  const handleAnswerChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    const numericValue = value.replace(/\D/g, ''); // 숫자만 추출
    setKeyword(numericValue);
    onAnswer(numericValue);
    const isValidInput = /^\d+$/.test(numericValue);
    const isWithinRange =
      parseInt(numericValue) <= 0 || parseInt(numericValue) > 120;
    if (isValidInput === false) {
      setShowValidMessage(true);
    } else {
      setShowValidMessage(false);
    }
    if (isWithinRange === true) {
      setShowWithiMessage(true);
    } else {
      setShowWithiMessage(false);
    }
  };

  useEffect(() => {
    console.log('?', answers);
    if (answers) {
      setKeyword(answers[1]);
      onAnswer(answers[1]);
    }
  }, []);

  return (
    <div className="h-[75vh] overflow-hidden">
      <div className="flex justify-center place-content-center h-full">
        <div className="grid grid-cols-1 place-items-center">
          <div className="grid justify-center mb-20 content-center">
            <p className="text-2xl font-black antialiased hover:subpixel-antialiased text-center">
              {question?.surveyQuestion}
            </p>
            <p className="text-sm text-center text-blue-600/60 my-2 font-bold antialiased hover:subpixel-antialiased">
              맞춤 영양제 추천을 위해 나이가 필요해요
            </p>
            <label>
              {showValidMessage ? (
                <span className="label-text-alt text-red-600/60 font-semibold antialiased hover:subpixel-antialiased">
                  숫자만 입력해주세요.
                </span>
              ) : (
                <br />
              )}
            </label>
            <input
              type="text"
              value={keyword}
              onChange={handleAnswerChange}
              placeholder="입력하세요"
              autoFocus
              required
              className="input input-bordered w-full max-w-xs"
            />
            <label>
              {showWithinMessage ? (
                <span className="label-text-alt text-red-600/60 font-semibold antialiased hover:subpixel-antialiased">
                  0에서 120내로 입력해주세요.
                </span>
              ) : (
                <br />
              )}
            </label>
          </div>
          <div className="flex justify-items-end fixed bottom-14">
            <button
              onClick={onNextPage}
              disabled={
                showValidMessage ||
                showWithinMessage ||
                keyword === undefined
              }
              className="btn btn-primary btn-radius btn-wide btn-circle antialiased hover:subpixel-antialiased "
            >
              다음
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage1;
