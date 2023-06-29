import { useEffect, useState } from 'react';
import api from '@/apis/config';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import MyTakingItem from './MyTakingItem';
import { AxiosResponse } from 'axios';

//나의 복용중인 영양제 리스트
const Taking = (): React.ReactElement => {
  const [userId, setUserId] = useState<number | null>(null);
  const [itemData, setItemData] = useState<Item[]>([]);
  const router = useRouter();

  useEffect(() => {
    const id = Number.parseInt(
      localStorage.getItem('userId') as string,
    );
    setUserId(id);
  }, []);

  useEffect(() => {
    if (userId !== null) {
      // userId가 정의된 후에만 API 호출을 실행합니다.
      getItemData(userId).then((res) => {
        // API 응답의 데이터 구조에 대한 안전한 처리를 추가합니다.
        if (res?.data?.takingNutrientList) {
          setItemData(res.data.takingNutrientList);
        }
      });
    }
  }, [userId]);

  const getItemData = async (id: number): Promise<AxiosResponse> => {
    return await api.getTakingPillList(id);
  };

  return (
    <div>
      <div className="flex items-baseline justify-between sm:items-center">
        <div className="w-[240px] sm:w-full">
          <p className="ml-2 text-xl font-extrabold text-[#1E266E]">
            복용 중인 영양제
          </p>
          <p className="ml-2 text-xs font-light text-[#1E266E] mb-2 whitespace-pre-line">
            새로 복용하시는 제품이 있다면 오른쪽에서 추가해보세요.
          </p>
        </div>

        <button
          className="btn bg-[#1E266E] btn-xs"
          onClick={() => router.push('/recommend')}
        >
          추가하기
        </button>
      </div>

      <div className="flex flex-col space-x-2 items-center w-[320px] sm:w-[400px] bg-white shadow-lg text-xs font-base text-[#909090] rounded-md p-4">
        <div id="item-list">
          {itemData && userId !== null ? (
            itemData.map(
              (item: Item, index: number): React.ReactElement => (
                <MyTakingItem item={item} id={userId} />
              ),
            )
          ) : (
            <div className="flex flex-col">
              <span>복용 중인 영양제가 없습니다.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Taking;
