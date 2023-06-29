//'use client'

import React from 'react';
import Main from '/public/main.svg';
import Image from 'next/image';
import kakao from '/public/kakao_login_large_wide.png';
import Link from 'next/link';

const KAKAO_URL = process.env.REACT_APP_KAKAO_URL as string;
// const KAKAO_URL = process.env.REACT_APP_TEST_URL as string;

const Login = (): React.ReactElement => {
  return (
    <div className="grid grid-rows h-[100vh] pt-16 bg-white">
      {/* 로고화면
       */}
      <div className="w-full h-80 bg-[#D8EDFF] flex justify-center items-center pl-10">
        <Main />
      </div>
      {/* 폼화면 */}
      <div className="flex justify-center">
        <div className="flex flex-col w-10/12 sm:w-2/3">
          <button>
            <Link href={KAKAO_URL}>
              <Image
                src={kakao}
                alt="kakaoLogin"
                className="w-full"
                priority={true}
              />
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
