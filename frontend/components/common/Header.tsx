import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Logo from 'public/logo.svg';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useUserStore from '@/store/userStore';

const Header = (): React.ReactElement => {
  const [isClicked, setIsClicked] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const router = useRouter();
  const inputRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (useUserStore.getState().user?.id) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  //입력결과 state로 저장
  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    e.preventDefault();

    setSearchKeyword(e.target.value);
  };

  const handleSearch = (): void => {
    //검색결과 페이지로 이동

    //검색어가 없거나 공백일 경우 검색하지 않음
    if (searchKeyword.trim() === '') {
      setSearchKeyword('');
      setIsClicked(true);
      return;
    } else {
      setSearchKeyword('');
      setIsClicked(true);
      router.push(`/recommend/result?query=${searchKeyword}`);
    }

    //next/router(Next.js 13이전 버전)에서 사용하던 방식
    // router.push({
    //   pathname: '/search',
    //   query: { keyword: searchKeyword },
    // });
  };

  const handleKeypress = (e: React.KeyboardEvent) => {
    // e.preventDefault(); //이거 있으면 다른 키가 안먹음

    const key: string = e.code;
    switch (key) {
      case 'Enter':
        if (searchKeyword.trim() === '') {
          setSearchKeyword('');
          setIsClicked(true);
          return;
        } else {
          setIsClicked(true);
          setSearchKeyword('');
          router.push(`/recommend/result?query=${searchKeyword}`);
        }
        break;
    }
  };

  const startSearch = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className="fixed top-0 navbar bg-base-100 z-50 w-[360px] sm:w-[512px]">
      <div className="navbar-start">
        <button
          className="px-2 btn btn-ghost btn-sm"
          onClick={() => router.back()}
        >
          <ChevronLeftIcon />
        </button>
      </div>

      {isClicked ? (
        <div className="absolute navbar-center left-1/3">
          <Link
            href="/"
            className="text-xl text-blue-900 normal-case btn btn-ghost"
          >
            <Logo />
          </Link>
        </div>
      ) : (
        <div className="w-0 navbar-center-hidden">
          <Link
            href="/"
            className="text-xl text-blue-900 normal-case btn btn-ghost"
          >
            <Logo />
          </Link>
        </div>
      )}

      {!isClicked ? (
        <div className="navbar-end">
          <div
            id="searchbar"
            className="flex items-center justify-center pr-1"
          >
            <input
              id="searchbar-input"
              type="text"
              placeholder="검색어를 입력하세요"
              className="w-full max-w-xs input input-bordered input-sm"
              onChange={handleInput}
              onKeyDown={handleKeypress}
              value={searchKeyword}
              ref={inputRef}
            />

            <button
              className="px-2 btn btn-ghost btn-sm"
              onClick={handleSearch}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#C2D1D9"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
          <button
            id="btn-search-hidden"
            className="btn btn-ghost btn-circle"
            onClick={() => setIsClicked(!isClicked)}
          >
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      ) : (
        <div className="navbar-end">
          <div
            id="searchbar-hidden"
            className="flex items-center justify-center"
          >
            <input
              id="searchbar-input-hidden"
              type="text"
              placeholder="검색어를 입력하세요"
              className="w-full max-w-xs input input-bordered input-sm"
              onChange={handleInput}
              onKeyDown={handleKeypress}
            />

            <button
              className="px-2 btn btn-ghost btn-sm"
              onClick={handleSearch}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#C2D1D9"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
          <button
            id="btn-search"
            className="btn btn-ghost btn-circle"
            onClick={startSearch}
          >
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      )}

      <div className="dropdown">
        <label tabIndex={0} className="btn btn-ghost btn-circle">
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
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </label>
        <ul
          tabIndex={0}
          className="right-0 w-40 p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box"
        >
          <li key="home">
            <Link href="/">
              <HomeIcon />
              홈으로
            </Link>
          </li>
          <li key="login">
            {isLoggedIn ? (
              <div
                onClick={() => {
                  useUserStore.getState().resetUser();
                  router.refresh();
                }}
              >
                <LoginIcon />
                로그아웃
              </div>
            ) : (
              <Link href="/user/login">
                <LoginIcon />
                로그인
              </Link>
            )}
          </li>
          {isLoggedIn && (
            <li key="mypage">
              <Link href="/mypage">
                <AccountCircleIcon />
                마이페이지
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
