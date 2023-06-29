import React from 'react';
import { NextPageWithLayout } from '../_app';
import AppLayout from '@/components/layout/AppLayout';
import HeaderLayout from '@/components/layout/HeaderLayout';
import PillAnalysisMain from '@/containers/PillAnalysisPage/PillAnalysisMain';

const PillAnalysis: NextPageWithLayout = () => {
  return <PillAnalysisMain />;
};

PillAnalysis.getLayout = function getLayout(
  page: React.ReactElement,
) {
  return (
    <AppLayout>
      <HeaderLayout>{page}</HeaderLayout>
    </AppLayout>
  );
};

export default PillAnalysis;
