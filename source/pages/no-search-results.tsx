import { useRouter } from 'next/router';
import React from 'react';
import NoSSR from 'react-no-ssr';
import { BrandType } from '../constants';
import { environment } from '../environment';
import { SearchType } from '../features/search/store';
import NoSearchResult from '../features/search/ui/NoSearchResult';
import { SearchBar } from '../features/search/ui/SearchBar';
import { SearchFeatureProvider } from '../features/search/ui/SearchFeatureProvider';
import { Footer, Header, Layout } from '../widgets/layout';

let NoSearchResultsPage = () => <NoSSR />;
if (environment.IS_CLIENT) {
  NoSearchResultsPage = () => {
    const router = useRouter();
    return (
      <NoSSR>
        <Layout>
          <Header brandType={BrandType.ENLARGED} />
          <SearchFeatureProvider>
            <SearchBar brandType={BrandType.ENLARGED} />
          </SearchFeatureProvider>
          <NoSearchResult
            searchQuery={router.query?.id as string}
            searchType={SearchType.unknown}
          />
          <Footer />
        </Layout>
      </NoSSR>
    );
  };
}

export default NoSearchResultsPage;
