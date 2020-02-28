import Head from 'next/head';
import React from 'react';
import { StaticLayoutProps } from '../../../../lib/types';
import { ShrinkedHeaderLayout } from '../../../../widgets/layout/ShrinkedHeaderLayout';
import { useI18nFeature } from '../../../i18n/context';
import { i18nInitialProps } from '../../../i18n/utils';
import { AddressSearchResult } from '../../../search/ui/AddressSearchResult';
import { TransactionsFeatureProvider } from '../../../transactions/components/TransactionsFeatureProvider';

export const AddressPage = () => (
  <TransactionsFeatureProvider>
    <AddressSearchResult />
  </TransactionsFeatureProvider>
);

const StaticLayout = (props: StaticLayoutProps) => {
  const { translate } = useI18nFeature().store;
  return (
    <ShrinkedHeaderLayout>
      <Head>
        <title>{translate('address.pageTitle')}</title>
      </Head>
      {props.children}
    </ShrinkedHeaderLayout>
  );
};

AddressPage.getStaticLayout = () => StaticLayout;
AddressPage.getInitialProps = i18nInitialProps;
