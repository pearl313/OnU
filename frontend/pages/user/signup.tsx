//'use client'

import React from 'react';
import { NextPageWithLayout } from '../_app';
import AppLayout from '@/components/layout/AppLayout';
import HeaderLayout from '@/components/layout/HeaderLayout';
import SignUp from '@/containers/UserPage/SignUp';

const SignUpPage: NextPageWithLayout = () => {
  return <SignUp />;
};

//레이아웃 적용이 필요하면 getLayout을 호출해주고,
//AppLayout안에 원하는 레이아웃을 중첩시킬 수도 있습니다
//추가로 중첩 안시키면 기본 AppLayout이 적용됨
SignUpPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <AppLayout>
      <HeaderLayout>{page}</HeaderLayout>
    </AppLayout>
  );
};

export default SignUpPage;
