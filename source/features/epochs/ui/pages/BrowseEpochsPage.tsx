import Head from 'next/head';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StaticLayoutProps } from '../../../../lib/types';
import { ShrinkedHeaderLayout } from '../../../../widgets/layout/ShrinkedHeaderLayout';
import { BlocksFeatureProvider } from '../../../blocks/ui/BlocksFeatureProvider';
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
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t('browseEpochs.pageTitle')}</title>
      </Head>
      <ShrinkedHeaderLayout>{props.children}</ShrinkedHeaderLayout>
    </>
  );
};

BrowseEpochsPage.getStaticLayout = () => StaticLayout;
BrowseEpochsPage.getInitialProps = i18nInitialProps;
