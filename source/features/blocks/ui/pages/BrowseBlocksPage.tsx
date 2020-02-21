import Head from 'next/head';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StaticLayoutProps } from '../../../../lib/types';
import { ShrinkedHeaderLayout } from '../../../../widgets/layout/ShrinkedHeaderLayout';
import { i18nInitialProps } from '../../../i18n/utils';
import BlocksBrowser from '../BlocksBrowser';
import { BlocksFeatureProvider } from '../BlocksFeatureProvider';

export const BrowseBlocksPage = () => (
  <BlocksFeatureProvider>
    <BlocksBrowser title="Browse Blocks" />
  </BlocksFeatureProvider>
);

const StaticLayout = (props: StaticLayoutProps) => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t('browseBlocks.pageTitle')}</title>
      </Head>
      <ShrinkedHeaderLayout>{props.children}</ShrinkedHeaderLayout>
    </>
  );
};

BrowseBlocksPage.getStaticLayout = () => StaticLayout;
BrowseBlocksPage.getInitialProps = i18nInitialProps;
