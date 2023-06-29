import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ButtonGroup from './ButtonGroup';
import profileImg1 from '@/public/liquid.png';
import profileImg2 from '@/public/capsule.png';
import profileImg3 from '@/public/jelly.png';
import profileImg4 from '@/public/powder.png';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useRouter } from 'next/navigation';
import api from '@/apis/config';
import { AxiosResponse } from 'axios';
import TimePicker from '@/components/common/TimePicker';

const bgImgSet: string[] = [
  'https://images.unsplash.com/photo-1612540943977-98ce54bea8a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
  'https://images.unsplash.com/photo-1596572934980-5a6a24b04f33?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  'https://images.unsplash.com/photo-1584174594005-60a49c828bbc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1136&q=80',
];

const iconImgSet = [
  profileImg1,
  profileImg2,
  profileImg3,
  profileImg4,
];

const Profile = (): React.ReactElement => {
  // const bgRandom = Math.floor(
  //   Math.random() * (bgImgSet.length - 0.5),
  // );
  // const iconRandom = Math.floor(
  //   Math.random() * (iconImgSet.length - 0.5),
  // );
  const bgRandom = 0;
  const iconRandom = 0;
  const router = useRouter();

  const [userInfo, setUserInfo] = useState<IUser>();
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  //캘린더 조회 api 호출

  const checkPhoneAuth = () => {
    return api.checkAuth(
      Number.parseInt(localStorage.getItem('userId') as string),
    );
  };

  const handleAlarm = () => {
    checkPhoneAuth()
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setIsModalOpen(true);
        }
      })
      .catch(() => {
        if (
          window.confirm(
            '복용 알림 설정을 위해선 휴대폰 인증이 필요합니다. 이동하시겠습니까?',
          )
        )
          router.push('/user/phoneauth');
      });
  };

  useEffect((): void => {
    getUser(
      Number.parseInt(localStorage.getItem('userId') as string),
    );
  }, [isModalOpen]);

  const getUser = async (userId: number): Promise<void> => {
    await api.getUserInfo(userId).then((res: AxiosResponse) => {
      setUserInfo({
        id: userId,
        nickname: res.data.userInfo.userNickname,
        age: res.data.userInfo.userAge,
        gender: res.data.userInfo.userGender,
      });
    });
  };

  return (
    <div
      className="pt-16 m-0 hero"
      style={{
        backgroundImage: `url(${bgImgSet[bgRandom]})`,
      }}
    >
      <div className="hero-overlay bg-opacity-40" />
      <div className="text-center hero-content text-neutral-content">
        <div className="flex flex-col items-center max-w-md">
          <div className="flex w-[320px] sm:w-[400px] items-center  space-x-2">
            <div className="flex items-center justify-center w-20 h-20 mb-2 text-5xl font-bold bg-white mask mask-circle">
              <Image
                src={iconImgSet[iconRandom]}
                width={48}
                height={48}
                alt=""
              />
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col items-start w-full mt-4">
                <p className="mr-8">{userInfo?.nickname}</p>
                <p className="mb-5">
                  {Math.floor((userInfo?.age as number) / 10) * 10}대{' '}
                  {userInfo?.gender === 'male' ? '남성' : '여성'}
                </p>
              </div>
              <div id="buttons" className="flex items-center">
                <button
                  className="btn btn-ghost btn-circle"
                  onClick={handleAlarm}
                >
                  <div className="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                    <span className="badge badge-xs badge-primary indicator-item"></span>
                  </div>
                </button>
                <button
                  className="btn btn-ghost btn-circle"
                  onClick={() => router.push('/user/update')}
                >
                  <SettingsOutlinedIcon />
                </button>
              </div>
            </div>
          </div>
          <ButtonGroup />
        </div>
      </div>

      {isModalOpen && (
        <div className="flex items-center justify-center z-50 h-[100vh] w-[360px] sm:w-[512px] fixed top-0 pb-20 bg-neutral-400/80">
          <div className="bg-white flex flex-col items-center absolute border-solid rounded-xl shadow mt-[50%] mb-[50%] p-4 font-sans">
            <div className="">
              <div className="flex justify-between">
                <div className="flex flex-col items-baseline">
                  <h3 className="text-lg font-bold">알림 설정</h3>
                  <span className="ml-2 text-xs font-light text-[#1E266E] mb-2">
                    알림을 받을 시간을 설정해주세요
                  </span>
                </div>

                <button
                  className="border-none btn btn-xs btn-outline"
                  onClick={() => setIsModalOpen(false)}
                >
                  x
                </button>
              </div>

              <TimePicker onClose={() => setIsModalOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
