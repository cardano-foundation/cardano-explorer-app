import debug from 'debug';
import React from 'react';
import NoSSR from 'react-no-ssr';
import { environment } from '../../environment';
import NoSearchResult from '../../features/search/NoSearchResult';
import { Footer, Header, Layout } from '../../widgets/layout';

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
