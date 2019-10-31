import React from 'react';
import NoSSR from 'react-no-ssr';
import { environment } from '../environment';
import { BlocksSearchResult } from '../features/blocks/ui/BlocksSearchResult';
import { SearchFeatureProvider } from '../features/search/components/SearchFeatureProvider';
import { Footer, Header, Layout } from '../widgets/layout';

let BlockPage = () => <NoSSR />;
if (environment.IS_CLIENT) {
  BlockPage = () => (
    <NoSSR>
      <Layout>
        <Header />
        <SearchFeatureProvider>
          <BlocksSearchResult />
        </SearchFeatureProvider>
        <Footer />
      </Layout>
    </NoSSR>
  );
}

export default BlockPage;
