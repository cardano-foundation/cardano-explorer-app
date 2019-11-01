import React from 'react';
import NoSSR from 'react-no-ssr';
import { BrandType } from '../constants';
import { environment } from '../environment';
import NoSearchResult from '../features/search/components/NoSearchResult';
import { SearchFeatureProvider } from '../features/search/components/SearchFeatureProvider';
import { SearchBar } from '../features/search/containers/SearchBar';
import { Footer, Header, Layout } from '../widgets/layout';

let NoSearchResultsPage = () => <NoSSR />;
if (environment.IS_CLIENT) {
  NoSearchResultsPage = () => (
    <NoSSR>
      <Layout>
        <Header brandType={BrandType.ENLARGED} />
        <SearchFeatureProvider>
          <SearchBar brandType={BrandType.ENLARGED} />
        </SearchFeatureProvider>
        <NoSearchResult />
        <Footer />
      </Layout>
    </NoSSR>
  );
}

export default NoSearchResultsPage;
