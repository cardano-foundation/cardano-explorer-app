import React from 'react';
import NoSSR from 'react-no-ssr';
import { BrandType } from '../constants';
import { environment } from '../environment';
import { EpochsSearchResult } from '../features/search/ui/EpochsSearchResult';
import { Footer, Header, Layout } from '../widgets/layout';
import styles from './epoch.scss';

let EpochPage = () => <NoSSR />;
if (environment.IS_CLIENT) {
  EpochPage = () => (
    <NoSSR>
      <Layout header={<Header brandType={BrandType.SHRINKED} />}>
        <div className={styles.epochLayout}>
          <EpochsSearchResult />
          <Footer />
        </div>
      </Layout>
    </NoSSR>
  );
}

export default EpochPage;
