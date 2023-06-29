import HeartIcon from '@/public/heartIcon.svg';
import PillIcon from '@/public/pillIcon.svg';
import SuppleIcon from '@/public/suppleIcon.svg';
import ReviewIcon from '@/public/reviewIcon.svg';
import { useRouter } from 'next/navigation';

const ButtonGroup = (): React.ReactElement => {
  const router = useRouter();

  return (
    <div
      id="button-group"
      className="w-[320px] sm:w-[400px] bg-white shadow-lg text-xs font-base text-[#909090] rounded-md grid grid-cols-4 justify-items-center p-4"
    >
      <button
        className="flex flex-col items-center col-start-1 col-end-2"
        onClick={() => router.push('/mypage')}
      >
        <HeartIcon />
        <span>나의영양관리</span>
      </button>
      <button
        className="flex flex-col items-center col-start-2 col-end-3"
        onClick={() => router.push('/mypage/taking')}
      >
        <PillIcon />
        <span>복용영양제</span>
      </button>
      <button
        className="flex flex-col items-center col-start-3 col-end-4"
        onClick={() => router.push('/mypage/interest')}
      >
        <SuppleIcon />
        <span>관심영양제</span>
      </button>
      <button
        className="flex flex-col items-center col-start-4"
        onClick={() => router.push('/mypage/review')}
      >
        <ReviewIcon />
        <span>리뷰관리</span>
      </button>
    </div>
  );
};

export default ButtonGroup;
