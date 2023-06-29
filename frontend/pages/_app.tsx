import React from 'react';
import Head from 'next/head';
import '@/styles/globals.css';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { NextPage } from 'next';
import useUserStore from '@/store/userStore';
import ScrollTopBtn from '@/components/common/ScrollTopBtn';

if (typeof window !== 'undefined') {
  // Perform localStorage action
  console.log('로그인 체크중...');
  useUserStore.getState().initialize();
  console.log(useUserStore.getState().user?.id);
}

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, //window가 focus되었을 경우 자동으로 refetch해주는 옵션
    },
  },
});

export default function App({
  Component,
  pageProps,
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <QueryClientProvider client={client}>
      <Head>
        <title>OnU: my Own NUtrients</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {getLayout(<Component {...pageProps} />)}
      <ScrollTopBtn />
    </QueryClientProvider>
  );
}
