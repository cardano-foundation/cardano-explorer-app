import Head from 'next/head';
import React from 'react';
import { StaticLayoutProps } from '../../../../lib/types';
import { ShrinkedHeaderLayout } from '../../../../widgets/layout/ShrinkedHeaderLayout';
import { BlocksFeatureProvider } from '../../../blocks/ui/BlocksFeatureProvider';
import { useI18nFeature } from '../../../i18n/context';
import { i18nInitialProps } from '../../../i18n/utils';
import EpochsBrowser from '../EpochsBrowser';
import { EpochsFeatureProvider } from '../EpochsFeatureProvider';

export const BrowseEpochsPage = () => (
  <BlocksFeatureProvider>
    <EpochsFeatureProvider>
      <EpochsBrowser />
    </EpochsFeatureProvider>
  </BlocksFeatureProvider>
);

const StaticLayout = (props: StaticLayoutProps) => {
  const { translate } = useI18nFeature().store;
  return (
    <>
      <Head>
        <title>{translate('browseEpochs.pageTitle')}</title>
      </Head>
      <ShrinkedHeaderLayout>{props.children}</ShrinkedHeaderLayout>
    </>
  );
};

BrowseEpochsPage.getStaticLayout = () => StaticLayout;
BrowseEpochsPage.getInitialProps = i18nInitialProps;
