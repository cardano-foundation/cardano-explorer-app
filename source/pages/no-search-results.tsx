import React from 'react';
import NoSSR from 'react-no-ssr';
import { environment } from '../environment';
import NoSearchResult from '../features/search/components/NoSearchResult';
import { Footer, Header, Layout } from '../widgets/layout';

let NoSearchResultsPage = () => <NoSSR />;
if (environment.IS_CLIENT) {
  NoSearchResultsPage = () => (
    <NoSSR>
      <Layout hasContainer>
        <Header />
        <NoSearchResult />
        <Footer />
      </Layout>
    </NoSSR>
  );
}

export default NoSearchResultsPage;
