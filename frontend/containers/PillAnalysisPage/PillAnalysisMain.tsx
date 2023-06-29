import React from 'react';
import PillAnalysisComb from './PillAnalysisComb';
import { useState, useEffect } from 'react';
import PillAnalysisGraph from './PillAnalysisGraph';
import PillAnalysisHaveBox from './PillAnalysisHaveBox';
import PillAnalysisLikeBox from './PillAnalysisLikeBox';
import Image from 'next/image';
import more from '../../public/more.png';
import question from '../../public/question.png';
import { useRouter } from 'next/navigation';

import PillAnalysisCombBox from './PillAnalysisCombBox';
import api from '@/apis/config';
import useUserStore from '@/store/userStore';
import { makeCombinationStore } from '@/store/makeCombinationStore';

type combination = {
  combinationId: number;
  nutrientInfoList: Array<InfoList>;
};

type InfoList = {
  nutrientId: number;
  nutrientName: string;
  nutrientImageUrl: string;
  nutrientBrand: string;
};

function PillAnalysisMain() {
  //차트 어떤거 보여줄지 정하는 state, -1은 복용중인 영양제들(초기상태)/-2는 복용/관심으로 클릭해서 만드는것
  //양수는 그 수가 영양제 조합의 id
  const [showChart, setShowchart] = useState<number>(-1);
  const router = useRouter();
  const [userId, setUserId] = useState<number>();
  const { combList, resetCombList } = makeCombinationStore();
  const [cancle, setCancle] = useState<boolean>(false);
  //이상하게 아래 store 훅만 써주면 무한렌더링됨 ( 터지지는 않음 ) 그냥 둬야할까? 이제는 터진다
  // const { combinations, resetCombinations } = combinationStore();

  // props로 deleteAnything 값 바꾸는 함수 자식들에게 내려주고, x 눌렀을 때, 변동이 생긴 값이 올라오면 재렌더링
  const [deleteAnything, setDeleteAnything] =
    useState<boolean>(false);
  const [newSelectedComb, setNewSelectedComb] = useState<number>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userData = JSON.parse(
        localStorage.getItem('userId') || '{}',
      );
      if ((userData as number) !== undefined) setUserId(userData);
    }
  }, []);

  const reRendering = () => {
    setDeleteAnything(!deleteAnything);
  };

  //선택된 조합 id 저장하는 함수 ( 그래프용 )
  const isSelectedComb = (id: number) => {
    setShowchart(id);
    //조합 클릭하면 복용중/관심 css 없애줘야하기때문에 setCancle
    setCancle(true);
    autoMoveToChart();
  };

  //조합 저장하는 함수 => zustand에 저장되어 있는 리스트를 서버에 보내준다.
  const saveCombination = async () => {
    const id: number = useUserStore.getState().user?.id as number;

    //존재하는 조합이면 추가하지 않도록 => 무한렌더링때문에 보류
    // isExist();

    await api.saveComb(id, combList).then((res) => console.log(res));
    setDeleteAnything(!deleteAnything);
    //저장하고 combListStore에 저장한 리스트 삭제
    resetCombList();
    //조합을 누르면 기존에 눌려있던 복용중인 영양제/ 관심 영양제들의 css 없애주기 위한 state cancle flase로 변경해서 props로 내려줌
    //각 컴포넌트에서 cancle이 true이면 css 변경해주고 true로 바꿔줌
    setCancle(true);

    //새 조합 저장했을 때, 바로 그 새로운 조합에 포커싱+차트띄우기 위한 부분
    if (typeof window !== 'undefined') {
      const newCombId = JSON.parse(
        localStorage.getItem('lastCombId') || '{}',
      );
      if ((newCombId as number) !== undefined) {
        setShowchart(newCombId + 1);
        console.log(newCombId + 1);
      }
      setNewSelectedComb(newCombId + 1);
    }
    autoMoveToChart();
  };

  //차트로 바로 자동 스크롤해주는 함수
  const autoMoveToChart = () => {
    event?.preventDefault();
    const element = document.getElementById('target');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  //cancle 다시 false로 갱신해주는 함수
  const renew = () => {
    setCancle(false);
  };

  // 관심 영양제 추가하는 함수
  const addLikeList = () => {
    //검색페이지로 이동
    router.push(`/recommend`);
  };

  //조합 중복 있는지 확인하는 함수
  const isExist = () => {
    // const combListAll = combinations;
    // console.log(combListAll);
    // if (combListAll.length == 0) {
    //   console.log('no');
    // }
    return true;
  };

  //복용중/관심에 props로 내려주고 클릭할때 차트컴포넌트에 -2 보내줌
  const makehaveLikeComb = () => {
    setShowchart(-2);
  };

  if (userId !== undefined)
    return (
      <div className="mt-20">
        <div className="mx-4">
          <div className="py-5">
            <div className="grid grid-cols-2">
              <div className="grid content-center col-span-1 ml-3 text-lg font-bold sm:text-xl">
                💪 복용중인 영양제
              </div>
              <div className="flex justify-end col-span-1 pt-1 pr-4 mb-1">
                <div
                  className="tooltip tooltip-bottom tooltip-left"
                  data-tip={`😀영양제를 조합해서 성분을 분석해보세요
                  만든 조합은 조합 저장하기로 다시 확인할 수 있어요`}
                  style={{ whiteSpace: 'pre-line' }}
                >
                  <Image
                    src={question}
                    alt="도움말"
                    className="w-5 h-5 mr-1"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            </div>
            <PillAnalysisHaveBox
              userId={userId}
              cancle={cancle}
              renew={renew}
              makehaveLikeComb={makehaveLikeComb}
            />
          </div>
          <div className="py-5">
            <div className="grid grid-cols-2">
              <div className="grid content-center col-span-1 ml-3 text-lg font-bold sm:text-xl">
                🧡 관심 영양제
              </div>
              <div className="flex justify-end col-span-1 pt-1 pr-4 mb-1">
                <button onClick={addLikeList}>
                  <Image
                    src={more}
                    alt="추가하기"
                    className="w-5 h-5 mr-1"
                    width={100}
                    height={100}
                  />
                </button>
              </div>
            </div>
            <PillAnalysisLikeBox
              userId={userId}
              reRendering={reRendering}
              cancle={cancle}
              renew={renew}
              makehaveLikeComb={makehaveLikeComb}
            />
          </div>
        </div>

        <a id="target"></a>
        <div className="bg-[#D8EDFF]  py-5 px-4 h-[100%]">
          <div className="grid grid-cols-3 mt-2">
            <div className="grid content-center col-span-2 ml-3 text-lg font-bold sm:text-xl">
              👀 성분 조합 한 눈에 보기
            </div>
            <div className="flex justify-end col-span-1">
              <button
                className="btn btn-active btn-sm bg-[#1E266E] h-3 font-bold"
                onClick={saveCombination}
              >
                이 조합 저장하기
              </button>
            </div>
          </div>
          <div></div>
          <div className="w-full mt-2 bg-white rounded-lg">
            <PillAnalysisGraph
              userId={userId}
              analysisType={showChart}
            />
          </div>
          <div className="mt-8">
            <div className="col-span-1 mb-2 ml-3 text-lg font-bold sm:text-xl">
              💊 나의 영양제 조합
            </div>
            <PillAnalysisCombBox
              userId={userId}
              reRendering={reRendering}
              isSelectedComb={isSelectedComb}
              cancle={cancle}
              renew={renew}
              newSelectedComb={newSelectedComb}
            />
          </div>
        </div>
      </div>
    );
  return <div>로딩중</div>;
}

export default PillAnalysisMain;
