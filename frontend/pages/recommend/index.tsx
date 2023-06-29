import { SearchBar } from '@/components/common/SearchBar';
import { NextPageWithLayout } from '../_app';
import AppLayout from '@/components/layout/AppLayout';
import HeaderLayout from '@/components/layout/HeaderLayout';
import SearchPill from '@/containers/SearchPage/SearchPill';
import InnerSearchResult from '@/containers/SearchPage/InnerSearchResult';
import { useRouter } from 'next/router';

//검색 결과
const SearchResultPage: NextPageWithLayout = () => {
  const router = useRouter();
  const keyword = router.query;
  console.log(keyword.query);
  return (
    <div className="pt-20">
      <SearchBar />
      {keyword.query ? <InnerSearchResult /> : <SearchPill />}
    </div>
  );
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
