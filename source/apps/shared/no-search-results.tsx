import debug from 'debug';
import React from 'react';
import NoSSR from 'react-no-ssr';
import { environment } from '../../environment';
import NoSearchResult from '../../features/widgets/search/components/NoSearchResult';
import { Footer, Header, Layout } from '../../layout';

if (environment.DEBUG) {
  debug.enable(environment.DEBUG);
}

export const NoSearchResultsPage = () => (
  <NoSSR>
    <Layout hasContainer>
      <Header />
      <NoSearchResult />
      <Footer />
    </Layout>
  </NoSSR>
);
