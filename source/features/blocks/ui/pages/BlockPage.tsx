import Head from 'next/head';
import React from 'react';
import { StaticLayoutProps } from '../../../../lib/types';
import { ShrinkedHeaderLayout } from '../../../../widgets/layout/ShrinkedHeaderLayout';
import { useI18nFeature } from '../../../i18n/context';
import { i18nInitialProps } from '../../../i18n/utils';
import { BlockSearchResult } from '../../../search/ui/BlockSearchResult';
import { TransactionsFeatureProvider } from '../../../transactions/components/TransactionsFeatureProvider';

export const BlockPage = () => (
  <TransactionsFeatureProvider>
    <BlockSearchResult />
  </TransactionsFeatureProvider>
);

const StaticLayout = (props: StaticLayoutProps) => {
  const { translate } = useI18nFeature().store;
  return (
    <ShrinkedHeaderLayout>
      <Head>
        <title>{translate('block.pageTitle')}</title>
      </Head>
      {props.children}
    </ShrinkedHeaderLayout>
  );
};

BlockPage.getStaticLayout = () => StaticLayout;
BlockPage.getInitialProps = i18nInitialProps;
