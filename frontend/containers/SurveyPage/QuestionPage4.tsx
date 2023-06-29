// QuestionPage4.tsx
import { useSearch } from '@/apis/hooks';
import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';

const QuestionPage4: React.FC<QuestionProps> = ({
  question,
  onPreviousPage,
  onNextPage,
  onAnswer,
  answers,
}) => {
  const [keyword, setKeyword] = useState<string>('');

  useEffect(() => {
    if (answers) {
      setKeyword(answers[4]);
    }
  }, []);

  const handleAnswerChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    setKeyword(event.target.value);
    onAnswer(value);
  };

  const [itemDataList, setItemDataList] = useState<Item[]>([]);
  const { isLoading, isError, data, error } = useSearch(
    keyword as string,
  );

  useEffect(() => {
    const res: AxiosResponse = data as AxiosResponse;
    setItemDataList(res?.data.searchedList);
  }, [data, keyword]);

  console.log(data);

  return (
    <div className="grid grid-cols-1 place-items-center h-[100vh]">
      <div className="flex flex-col items-center my-10">
        <span className="text-center text-xl font-black">
          {question.surveyQuestion}
        </span>
        <span className="text-center text-sm text-blue-600/50 mb-3 font-bold">
          복용 중인 것을 고려하여 추천해드려요
        </span>
        <input
          type="text"
          value={keyword}
          onChange={handleAnswerChange}
          className="input input-bordered w-full max-w-xs"
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
            onClick={onNextPage}
            className="btn btn-primary btn-radius btn-wide btn-circle antialiased hover:subpixel-antialiased "
            disabled={answers[4] === undefined || answers[4] === ''}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage4;
