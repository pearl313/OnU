import React, { useEffect, useState } from 'react';
// import api from '@/apis/config';
// import { useSearch } from '@/apis/hooks';
import ItemList from '@/components/list/GridList';
import { useSearch } from '@/apis/hooks';
import { AxiosResponse } from 'axios';
import CompareDrawer from '@/components/common/Drawer';

type SearchProps = {
  keyword: string;
};

type Item = {
  nutrientId: number; //itemId
  nutrientName: string; //제품명
  nutrientBrand: string; //제조사
  nutrientImageUrl: string; //썸네일 이미지
  isInterested?: boolean; //
};

const SearchResult = (props: SearchProps) => {
  const [itemDataList, setItemDataList] = useState<Item[]>([]);

  //검색어를 받아왔으니 검색 API 호출
  const { isLoading, isError, data, error } = useSearch(
    props.keyword,
  );

  useEffect(() => {
    const res: AxiosResponse = data as AxiosResponse;
    setItemDataList(res?.data.searchedList);
  }, [data]);

  if (isLoading) {
    console.log(`🚀`);
    return <div>로딩증...</div>;
  }
  if (isError) {
    console.log(error);
    return <div>검색한 결과를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="flex flex-col pt-10 items-center space-y-4 min-h-[100vh]">
      <div className="mt-10">
        <label className="ml-2 text-xl font-extrabold text-[#1E266E]">
          {props.keyword} 검색 결과
        </label>
        <hr />
        {/** 검색결과에 따른 값
         * 검색결과 형태가 정해지면 아래 ItemList에 props로 넘겨주기
         */}
        <ItemList itemList={itemDataList} />
      </div>
      <CompareDrawer />
    </div>
  );
};

export default SearchResult;
