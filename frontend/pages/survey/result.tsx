import React from 'react';
import { NextPageWithLayout } from '../_app';
import HeaderLayout from '@/components/layout/HeaderLayout';
import AppLayout from '@/components/layout/AppLayout';
import Result from '@/containers/SurveyPage/Result';

const SurveyResult: NextPageWithLayout = () => {
  return <Result />;
};

SurveyResult.getLayout = function getLayout(
  page: React.ReactElement,
) {
  return (
    <AppLayout>
      <HeaderLayout>{page}</HeaderLayout>
    </AppLayout>
  );
};

export default SurveyResult;
