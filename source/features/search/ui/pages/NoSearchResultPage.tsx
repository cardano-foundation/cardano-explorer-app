import { observer } from 'mobx-react-lite';
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
        searchQuery={navigation.store.query.query as string}
        searchType={SearchType.unknown}
      />
    </>
  );
};

const StaticLayout = (props: StaticLayoutProps) => {
  const i18n = useI18nFeature().store;
  return (
    <Layout>
      <Head>
        <title>{i18n.translate('noSearchResult.pageTitle')}</title>
      </Head>
      <Header brandType={BrandType.ENLARGED} />
      {props.children}
      <Footer />
    </Layout>
  );
};

NoSearchResultsPage.getStaticLayout = () => StaticLayout;
NoSearchResultsPage.getInitialProps = i18nInitialProps;

export default observer(NoSearchResultsPage);
