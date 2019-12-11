import React from 'react';
import NoSSR from 'react-no-ssr';
import { BrandType } from '../constants';
import { environment } from '../environment';
import { BlockSearchResult } from '../features/search/ui/BlockSearchResult';
import { TransactionsFeatureProvider } from '../features/transactions/components/TransactionsFeatureProvider';
import { Footer, Header, Layout } from '../widgets/layout';

let BlockPage = () => <NoSSR />;
if (environment.IS_CLIENT) {
  BlockPage = () => (
    <NoSSR>
      <Layout header={<Header brandType={BrandType.SHRINKED} />}>
        <TransactionsFeatureProvider>
          <BlockSearchResult />
        </TransactionsFeatureProvider>
        <Footer />
      </Layout>
    </NoSSR>
  );
}

export default BlockPage;
