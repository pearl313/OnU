import React from 'react';
// import QuestionGauge from '@/containers/SurveyPage/QuestionGauge';
import Question from '@/containers/SurveyPage/Question';
import { NextPageWithLayout } from '../_app';
import HeaderLayout from '@/components/layout/HeaderLayout';
import AppLayout from '@/components/layout/AppLayout';

const Survey: NextPageWithLayout = () => {
  return (
    <div>
      <Question />
    </div>
  );
};

Survey.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <AppLayout>
      <HeaderLayout>{page}</HeaderLayout>
    </AppLayout>
  );
};

export default Survey;
