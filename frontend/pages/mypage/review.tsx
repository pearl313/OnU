// 'use client';
import React from 'react';
import Profile from '@/containers/MyPage/Profile';
import AppLayout from '@/components/layout/AppLayout';
import { NextPageWithLayout } from '../_app';
import Review from '@/containers/MyPage/MyReview';
import HeaderLayout from '@/components/layout/HeaderLayout';

const MyReviewPage: NextPageWithLayout = (): React.ReactElement => {
  return (
    <div className="flex flex-col items-center space-y-4 min-h-[100vh]">
      <Profile />
      <Review />
    </div>
  );
};

MyReviewPage.getLayout = function getLayout(
  page: React.ReactElement,
) {
  return (
    <AppLayout>
      <HeaderLayout>{page}</HeaderLayout>
    </AppLayout>
  );
};

export default MyReviewPage;
