import { NextPageWithLayout } from '../_app';
import AppLayout from '@/components/layout/AppLayout';
import HeaderLayout from '@/components/layout/HeaderLayout';
import SearchResult from '@/containers/SearchPage/SearchResult';
import { useSearchParams } from 'next/navigation';

//검색 결과
const SearchResultPage: NextPageWithLayout = () => {
  const searchParams = useSearchParams();
  const query: string | null = searchParams.get('query');
  return <div>{query ? <SearchResult keyword={query} /> : null}</div>;
};

SearchResultPage.getLayout = function getLayout(
  page: React.ReactElement,
) {
  return (
    <AppLayout>
      <HeaderLayout>{page}</HeaderLayout>
    </AppLayout>
  );
};

export default SearchResultPage;
