import Head from 'next/head';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StaticLayoutProps } from '../../../../lib/types';
import { ShrinkedHeaderLayout } from '../../../../widgets/layout/ShrinkedHeaderLayout';
import { i18nInitialProps } from '../../../i18n/utils';
import { AddressSearchResult } from '../../../search/ui/AddressSearchResult';
import { TransactionsFeatureProvider } from '../../../transactions/components/TransactionsFeatureProvider';

export const AddressPage = () => (
  <TransactionsFeatureProvider>
    <AddressSearchResult />
  </TransactionsFeatureProvider>
);

const StaticLayout = (props: StaticLayoutProps) => {
  const { t } = useTranslation();
  return (
    <ShrinkedHeaderLayout>
      <Head>
        <title>{t('address.pageTitle')}</title>
      </Head>
      {props.children}
    </ShrinkedHeaderLayout>
  );
};

AddressPage.getStaticLayout = () => StaticLayout;
AddressPage.getInitialProps = i18nInitialProps;
