import React from 'react';
import NoSSR from 'react-no-ssr';
import { environment } from '../environment';
import { BlocksSearchResult } from '../features/search/components/BlocksSearchResult';
import { SearchFeatureProvider } from '../features/search/components/SearchFeatureProvider';
import Container from '../widgets/container/Container';
import { Footer, Header, Layout } from '../widgets/layout';

let BlockPage = () => <NoSSR />;
if (environment.IS_CLIENT) {
  BlockPage = () => (
    <NoSSR>
      <Layout>
        <Header />
        <Container>
          <SearchFeatureProvider>
            <BlocksSearchResult />
          </SearchFeatureProvider>
          <Footer />
        </Container>
      </Layout>
    </NoSSR>
  );
}

export default BlockPage;
