import React from 'react';
import NoSSR from 'react-no-ssr';
import { BrandType } from '../constants';
import { environment } from '../environment';
import { BlockSearchResult } from '../features/search/ui/BlockSearchResult';
import { Footer, Header, Layout } from '../widgets/layout';

let BlockPage = () => <NoSSR />;
if (environment.IS_CLIENT) {
  BlockPage = () => (
    <NoSSR>
      <Layout>
        <Header brandType={BrandType.SHRINKED} />
        <BlockSearchResult />
        <Footer />
      </Layout>
    </NoSSR>
  );
}

export default BlockPage;
