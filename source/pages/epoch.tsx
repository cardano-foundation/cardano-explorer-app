import React from 'react';
import NoSSR from 'react-no-ssr';
import { BrandType } from '../constants';
import { environment } from '../environment';
import { EpochsSearchResult } from '../features/search/components/EpochsSearchResult';
import { SearchFeatureProvider } from '../features/search/components/SearchFeatureProvider';
import Container from '../widgets/container/Container';
import { Footer, Header, Layout } from '../widgets/layout';
import styles from './epoch.scss';

let EpochPage = () => <NoSSR />;
if (environment.IS_CLIENT) {
  EpochPage = () => (
    <NoSSR>
      <Layout>
        <div className={styles.epochLayout}>
          <Header brandType={BrandType.SHRINKED} />
          <Container>
            <SearchFeatureProvider>
              <EpochsSearchResult />
            </SearchFeatureProvider>
          </Container>
          <Footer />
        </div>
      </Layout>
    </NoSSR>
  );
}

export default EpochPage;
