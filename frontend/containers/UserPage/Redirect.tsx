//로그인 이후 리다이렉트될 화면
import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import useUserStore from '@/store/userStore';

const Redirect = (): React.ReactElement => {
  const params = useSearchParams();
  const router = useRouter();

  //url에서 파라미터로 유저 정보 받아오기
  const id: number = Number(params.get('userId')) as number;
  const nickname: string = params.get('userNickname') as string;
  const age: number = Number(params.get('userAge')) as number;
  const gender: string = params.get('userGender') as string;
  const accessToken: string = params.get('accessToken') as string;

  useEffect(() => {
    const user = {
      id,
      nickname,
      age,
      gender,
    };

    useUserStore.getState().setUser(user);
    //백업용 스토리지에 유저 정보 저장
    localStorage.setItem('userId', id.toString());
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('userNickname', nickname);
    localStorage.setItem('userAge', age.toString());
    localStorage.setItem('userGender', gender);

    if (id === undefined || id === null) {
      router.push('/user/signup');
    } else router.push('/');
    return;
  }, [id, nickname, age, gender]);

  return <></>;
};

export default Redirect;
