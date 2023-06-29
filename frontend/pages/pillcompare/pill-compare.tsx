import React from 'react';
import { NextPageWithLayout } from '../_app';
import AppLayout from '@/components/layout/AppLayout';
import HeaderLayout from '@/components/layout/HeaderLayout';
import PillCompareMain from '@/containers/PillComparePage/PillCompareMain';
import { useSearchParams } from 'next/navigation';

const PillCompare: NextPageWithLayout = () => {
  const searchParams = useSearchParams();
  const query: string = searchParams.get('query') as string;
  const compare: string = searchParams.get('compare') as string;
  console.log(query, compare);

  return (
    <div>
      {query && compare ? (
        <PillCompareMain query={query} compare={compare} />
      ) : null}
    </div>
  );
};

PillCompare.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <AppLayout>
      <HeaderLayout>{page}</HeaderLayout>
    </AppLayout>
  );
};

export default PillCompare;
