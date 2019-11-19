import React from 'react';
import NoSSR from 'react-no-ssr';
import { BrandType } from '../constants';
import { environment } from '../environment';
import { BlocksFeatureProvider } from '../features/blocks/ui/BlocksFeatureProvider';
import EpochsBrowser from '../features/epochs/ui/EpochsBrowser';
import { EpochsFeatureProvider } from '../features/epochs/ui/EpochsFeatureProvider';
import { Footer, Header, Layout } from '../widgets/layout';

let BlockPage = () => <NoSSR />;
if (environment.IS_CLIENT) {
  BlockPage = () => (
    <NoSSR>
      <Layout header={<Header brandType={BrandType.SHRINKED} />}>
        <BlocksFeatureProvider>
          <EpochsFeatureProvider>
            <EpochsBrowser />
          </EpochsFeatureProvider>
        </BlocksFeatureProvider>
        <Footer />
      </Layout>
    </NoSSR>
  );
}

export default BlockPage;
