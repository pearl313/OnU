//'use client'

import React, { useEffect } from 'react';
import TextInput from '@/components/common/TextInput';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import api from '@/apis/config';
import useUserStore from '@/store/userStore';
import { useRouter } from 'next/navigation';

const SignUp = (): React.ReactElement => {
  const [nicknameLabel, setNicknameLabel] = React.useState('');
  const [nickname, setNickname] = React.useState('');
  const [randomNumber, setRandomNumber] = React.useState(
    Math.floor(Math.random() * 100),
  );
  const [birth, setBirth] = React.useState<number>();
  const [gender, setGender] = React.useState('');

  const router = useRouter();

  useEffect((): void => {
    //추후 서버에서 닉네임 중복확인 api를 받아와서 사용
    if (nickname.length >= 4 && nickname.length <= 15) {
      api.checkNickname(nickname).then((res) => {
        if (res.status === 200) {
          setNicknameLabel('사용 가능한 닉네임입니다.');
        } else {
          setNicknameLabel('사용 불가능한 닉네임입니다');
        }
      });
    } else if (nickname.length > 15) {
      setNicknameLabel('사용 불가능한 닉네임입니다');
    } else {
      setNicknameLabel('');
    }
  }, [nickname]);

  //타이핑시 닉네임 중복확인
  const checkNickname = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    e.preventDefault();
    setNickname(e.target.value);
  };

  //회원가입 완료처리
  const registerUser = async () => {
    const id: number = useUserStore.getState().user?.id as number;
    const age = `${birth}-12-31`;

    // 회원정보 보내고
    await api.signupUser(id, nickname, age, gender).then((res) => {
      console.log(res);
      router.push('/');
    });
  };

  return (
    <div className="grid grid-rows h-[100vh] bg-white pt-20">
      {/* 로고화면 
        로고가 너무 커서 임시로 주석처리함
      */}
      {/* <div className="w-full h-96 bg-[#D8EDFF] flex justify-center items-center pt-10 pl-10">
        <Main />
      </div> */}
      {/* 폼화면 */}
      <div className="grid grid-cols-4">
        <div className="col-start-2 col-end-4">
          <span className="ml-1 text-xl font-extrabold">
            추가정보 입력
          </span>
          <TextInput
            labelTopL="닉네임"
            onChange={checkNickname}
            labelBotR={nicknameLabel}
            value={nickname}
          />
          {nicknameLabel === '사용 불가능한 닉네임입니다' &&
          nickname.length >= 2 &&
          nickname.length <= 15 ? (
            <div className="rounded bg-[#F7F8FA] flex flex-row items-center text-sm space-x-4 m-0 p-2">
              <div>
                <span className="text-[#54C6F2] font-bold">
                  '{nickname + randomNumber}'{' '}
                </span>
                <br />
                <span>이 별명은 어떠신가요? </span>
              </div>
              <button
                className="bg-[#90B5EA] border-none btn btn-sm"
                onClick={() => setNickname(nickname + randomNumber)}
              >
                사용하기
              </button>
            </div>
          ) : null}
          <div className="flex flex-col mb-4 space-y-2">
            <label className="pl-1 text-base font-bold label-text">
              생년월일
            </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                format="YYYY-MM-DD"
                onYearChange={(date: Date) => {
                  setBirth(
                    Number.parseInt(date.toString().split(' ')[3]),
                  );
                }}
              />
            </LocalizationProvider>
          </div>

          <div className="flex justify-between mb-4">
            <span className="pl-1 font-bold">성별</span>
            <div className="flex space-x-2">
              <div className="flex flex-row space-x-1">
                <input
                  type="radio"
                  name="radio-2"
                  className="radio radio-info"
                  onClick={() => setGender('male')}
                />
                <span>남성</span>
              </div>
              <div className="flex flex-row space-x-1">
                <input
                  type="radio"
                  name="radio-2"
                  className="radio radio-info"
                  onClick={() => setGender('female')}
                />
                <span>여성</span>
              </div>
            </div>
          </div>
          <button
            className="bg-[#90B5EA] text-lg border-none btn btn-wide"
            onClick={registerUser}
          >
            회원가입 완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
