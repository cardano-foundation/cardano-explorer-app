import Head from 'next/head';
import React from 'react';
import { StaticLayoutProps } from '../../../../lib/types';
import { ShrinkedHeaderLayout } from '../../../../widgets/layout/ShrinkedHeaderLayout';
import { useI18nFeature } from '../../../i18n/context';
import { i18nInitialProps } from '../../../i18n/utils';
import { TransactionSearchResult } from '../../../search/ui/TransactionSearchResult';
import { TransactionsFeatureProvider } from '../../components/TransactionsFeatureProvider';

export const TransactionPage = () => (
  <TransactionsFeatureProvider>
    <TransactionSearchResult />
  </TransactionsFeatureProvider>
);

const StaticLayout = (props: StaticLayoutProps) => {
  const { translate } = useI18nFeature().store;
  return (
    <ShrinkedHeaderLayout>
      <Head>
        <title>{translate('transaction.pageTitle')}</title>
      </Head>
      {props.children}
    </ShrinkedHeaderLayout>
  );
};

TransactionPage.getStaticLayout = () => StaticLayout;
TransactionPage.getInitialProps = i18nInitialProps;
