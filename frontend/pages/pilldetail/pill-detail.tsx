import React from 'react';

import PillDetailMain from '@/containers/PillDetailPage/PillDetailMain';
import { NextPageWithLayout } from '../_app';
import HeaderLayout from '@/components/layout/HeaderLayout';
import AppLayout from '@/components/layout/AppLayout';
import { useSearchParams } from 'next/navigation';

const PillDetail: NextPageWithLayout = () => {
  const searchParams = useSearchParams();
  const id: string = searchParams.get('id') as string;

  return <PillDetailMain itemId={parseInt(id)} />;
};

PillDetail.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <AppLayout>
      <HeaderLayout>{page}</HeaderLayout>
    </AppLayout>
  );
};
export default PillDetail;
