import { NextPageWithLayout } from './_app';
import AppLayout from '@/components/layout/AppLayout';
import HeaderLayout from '@/components/layout/HeaderLayout';
import EntireList from '@/containers/PillListPage/EntireList';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import SimpleImageSlider from 'react-simple-image-slider';

const bgImgSet = [
  {
    url: 'https://images.unsplash.com/photo-1612540943977-98ce54bea8a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
  },
  {
    url: 'https://images.unsplash.com/photo-1596572934980-5a6a24b04f33?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
  {
    url: 'https://images.unsplash.com/photo-1584174594005-60a49c828bbc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1136&q=80',
  },
];

// viewport 너비에 따라 다른 값을 반환하는 custom hook
const useResponsiveDimension = () => {
  const [dimension, setDimension] = useState({
    width: '512px',
    height: '300px',
  });

  useEffect(() => {
    const updateDimension = () => {
      if (window.innerWidth < 640) {
        setDimension({ width: '360px', height: '250px' });
      } else {
        setDimension({ width: '512px', height: '300px' }); // 원하는 크기로 설정해주세요.
      }
    };

    updateDimension();
    window.addEventListener('resize', updateDimension);

    return () =>
      window.removeEventListener('resize', updateDimension);
  }, []);

  return dimension;
};

const Home: NextPageWithLayout = (): React.ReactElement => {
  const router = useRouter();
  const { width, height } = useResponsiveDimension();
  return (
    <div>
      <div
        className="relative hero"
        onClick={() => router.push('/survey')}
      >
        <SimpleImageSlider
          width={width}
          height={height}
          images={bgImgSet}
          showNavs={false}
          showBullets={true}
          autoPlay={true}
          onClick={() => router.push('/survey')}
        />

        <div className="flex flex-col items-baseline pt-40 sm:pt-56 pr-48 hero-content text-[#FFFFFF] w-[360px] sm:w-[512px]">
          <span className="text-lg font-bold whitespace-nowrap">
            나에게 맞는 영양제를 먹고 있는 걸까?
          </span>
          <span className="text-sm font-bold">설문하러 가기</span>
        </div>
      </div>
      <EntireList />
    </div>
  );
};

//레이아웃 적용이 필요하면 getLayout을 호출해주고,
//AppLayout안에 원하는 레이아웃을 중첩시킬 수도 있습니다
//추가로 중첩 안시키면 기본 AppLayout이 적용됨
Home.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <AppLayout>
      <HeaderLayout>{page}</HeaderLayout>
    </AppLayout>
  );
};

export default Home;
