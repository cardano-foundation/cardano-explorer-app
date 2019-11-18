import React from 'react';
import NoSSR from 'react-no-ssr';
import { BrandType } from '../constants';
import { environment } from '../environment';
import { TransactionSearchResult } from '../features/search/ui/TransactionSearchResult';
import { Footer, Header, Layout } from '../widgets/layout';

let TransactionPage = () => <NoSSR />;
if (environment.IS_CLIENT) {
  TransactionPage = () => (
    <NoSSR>
      <Layout header={<Header brandType={BrandType.SHRINKED} />}>
        <TransactionSearchResult />
        <Footer />
      </Layout>
    </NoSSR>
  );
}

export default TransactionPage;
