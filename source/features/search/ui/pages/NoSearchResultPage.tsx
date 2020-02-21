import Head from 'next/head';
import React from 'react';
import { BrandType } from '../../../../constants';
import { StaticLayoutProps } from '../../../../lib/types';
import { Footer, Header, Layout } from '../../../../widgets/layout';
import { useI18nFeature } from '../../../i18n/context';
import { i18nInitialProps } from '../../../i18n/utils';
import { useNavigationFeature } from '../../../navigation';
import { SearchType } from '../../store';
import NoSearchResult from '../NoSearchResult';
import { SearchBar } from '../SearchBar';
import { SearchFeatureProvider } from '../SearchFeatureProvider';

const NoSearchResultsPage = () => {
  const navigation = useNavigationFeature();
  return (
    <>
      <SearchFeatureProvider>
        <SearchBar brandType={BrandType.ENLARGED} />
      </SearchFeatureProvider>
      <NoSearchResult
        searchQuery={navigation.store.query.id as string}
        searchType={SearchType.unknown}
      />
    </>
  );
};

const StaticLayout = (props: StaticLayoutProps) => {
  const i18n = useI18nFeature();
  return (
    <Layout>
      <Head>
        <title>{i18n.store.t('noSearchResult.pageTitle')}</title>
      </Head>
      <Header brandType={BrandType.ENLARGED} />
      {props.children}
      <Footer />
    </Layout>
  );
};

NoSearchResultsPage.getStaticLayout = () => StaticLayout;
NoSearchResultsPage.getInitialProps = i18nInitialProps;

export default NoSearchResultsPage;
