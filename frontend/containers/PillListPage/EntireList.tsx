//'use client'

import React, { useState } from 'react';
import WorryCategoryList from '@/containers/PillListPage/WorryCategoryList';
import IngredientCategoryList from '@/containers/PillListPage/IngredientCategoryList';
import CompareDrawer from '@/components/common/Drawer';
import ScrollTopBtn from '@/components/common/ScrollTopBtn';

const EntireList = (): React.ReactElement => {
  //false : 성분별 클릭, true : 고민별 클릭
  const [tabState, setTabState] = useState<boolean>(false);

  return (
    <div className="grid grid-rows h-[100vh] bg-white pt-20 mx-4 space-y-8">
      {/* <SearchBar /> */}
      <div id="list">
        <label className="ml-2 text-xl font-extrabold text-[#1E266E]">
          영양제 한눈에 보기
        </label>
        <hr className="mt-2 mb-4" />
        <div id="list-header" className="flex justify-center w-full">
          <a
            className={
              tabState
                ? 'w-1/2 tab tab-bordered'
                : 'w-1/2 tab tab-bordered tab-active'
            }
            onClick={(): void => setTabState(false)}
          >
            성분별
          </a>
          <a
            className={
              tabState
                ? 'w-1/2 tab tab-bordered tab-active'
                : 'w-1/2 tab tab-bordered'
            }
            onClick={(): void => setTabState(true)}
          >
            고민별
          </a>
        </div>
        {tabState ? (
          <WorryCategoryList />
        ) : (
          <IngredientCategoryList />
        )}
      </div>
      <CompareDrawer />
    </div>
  );
};

export default EntireList;
