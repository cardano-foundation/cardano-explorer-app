import Head from 'next/head';
import React from 'react';
import { StaticLayoutProps } from '../../../../lib/types';
import { ShrinkedHeaderLayout } from '../../../../widgets/layout/ShrinkedHeaderLayout';
import { useI18nFeature } from '../../../i18n/context';
import { i18nInitialProps } from '../../../i18n/utils';
import BlocksBrowser from '../BlocksBrowser';
import { BlocksFeatureProvider } from '../BlocksFeatureProvider';

export const BrowseBlocksPage = () => {
  const { translate } = useI18nFeature().store;
  return (
    <BlocksFeatureProvider>
      <BlocksBrowser title={translate('browseBlocks.pageTitle')} />
    </BlocksFeatureProvider>
  );
};

const StaticLayout = (props: StaticLayoutProps) => {
  const { translate } = useI18nFeature().store;
  return (
    <>
      <Head>
        <title>{translate('browseBlocks.pageTitle')}</title>
      </Head>
      <ShrinkedHeaderLayout>{props.children}</ShrinkedHeaderLayout>
    </>
  );
};

BrowseBlocksPage.getStaticLayout = () => StaticLayout;
BrowseBlocksPage.getInitialProps = i18nInitialProps;
