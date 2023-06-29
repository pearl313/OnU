import React, { useEffect, useState } from 'react';
import PillAnalysisComb from './PillAnalysisComb';
import { useCombList } from '@/apis/hooks';
import api from '@/apis/config';
import { combinationStore } from '@/store/combinationStore';

type Props = {
  userId: number;
  reRendering: () => void;
  isSelectedComb: (id: number) => void;
  cancle: boolean;
  renew: () => void;
  newSelectedComb: number | undefined;
};

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

function PillAnalysisCombBox(props: Props): React.ReactElement {
  //조합 목록 저장
  const [combinationList, setCombinationList] = useState<
    Array<combination>
  >([]);

  //어떤 조합이 선택되어있는지 id 저장
  const [selectedComb, setSelectedComb] = useState<number>(0);
  //삭제된 조합 id 저장할 state => 근데 꼭 필요한가?? 자동 리렌더링 되면 api도 다시 받아올거니까 필요없을듯 일단 주석
  // 필요함 자동으로 리렌더링 안됨

  const { combinations, setCombinations, resetCombinations } =
    combinationStore();

  useEffect(() => {
    if (props.userId !== undefined) getCombination();
  }, [props]);

  const getCombination = async () => {
    await api
      .getCombList(props.userId)
      .then((res) => {
        console.log('조합 저장하기');
        console.log(res);
        setCombinationList(res.data.combinationList);
        resetCombinations();
        setCombinations(res.data.combinationList);

        //렌더링 문제로 로컬스토리에 일단 저장
        localStorage.setItem(
          'lastCombId',
          res.data.combinationList[combinationList.length - 1]
            .combinationId,
        );
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (props.newSelectedComb != undefined) {
      setSelectedComb(props.newSelectedComb);
    }
  }, [props.newSelectedComb]);

  //선택된 조합의 id저장 (하나만 고를 수 있도록)
  const selectCombination = (id: number) => {
    setSelectedComb(id);
    props.isSelectedComb(id);
  };

  return (
    <div>
      {combinationList ? (
        <div>
          {combinationList.map((combination, idx) => (
            <PillAnalysisComb
              key={idx}
              combination={combination}
              selectCombination={selectCombination}
              selectedComb={selectedComb}
              // deleteCombination={deleteCombination}
              reRendering={props.reRendering}
            />
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default PillAnalysisCombBox;
