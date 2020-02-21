import Head from 'next/head';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StaticLayoutProps } from '../../../../lib/types';
import { ShrinkedHeaderLayout } from '../../../../widgets/layout/ShrinkedHeaderLayout';
import { i18nInitialProps } from '../../../i18n/utils';
import { BlockSearchResult } from '../../../search/ui/BlockSearchResult';
import { TransactionsFeatureProvider } from '../../../transactions/components/TransactionsFeatureProvider';

export const BlockPage = () => (
  <TransactionsFeatureProvider>
    <BlockSearchResult />
  </TransactionsFeatureProvider>
);

const StaticLayout = (props: StaticLayoutProps) => {
  const { t } = useTranslation();
  return (
    <ShrinkedHeaderLayout>
      <Head>
        <title>{t('block.pageTitle')}</title>
      </Head>
      {props.children}
    </ShrinkedHeaderLayout>
  );
};

BlockPage.getStaticLayout = () => StaticLayout;
BlockPage.getInitialProps = i18nInitialProps;
