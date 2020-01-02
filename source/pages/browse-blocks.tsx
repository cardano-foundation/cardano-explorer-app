import React from 'react';
import NoSSR from 'react-no-ssr';
import { BrandType } from '../constants';
import { environment } from '../environment';
import BlocksBrowser from '../features/blocks/ui/BlocksBrowser';
import { BlocksFeatureProvider } from '../features/blocks/ui/BlocksFeatureProvider';
import { Footer, Header, Layout } from '../widgets/layout';

let BlockPage = () => <NoSSR />;
if (environment.IS_CLIENT) {
  BlockPage = () => (
    <NoSSR>
      <Layout header={<Header brandType={BrandType.SHRINKED} />}>
        <BlocksFeatureProvider>
          <BlocksBrowser title="Browse Blocks" />
        </BlocksFeatureProvider>
        <Footer />
      </Layout>
    </NoSSR>
  );
}

export default BlockPage;
