import Head from 'next/head';
import React from 'react';
import { StaticLayoutProps } from '../../../../lib/types';
import { ShrinkedHeaderLayout } from '../../../../widgets/layout/ShrinkedHeaderLayout';
import { BlocksFeatureProvider } from '../../../blocks/ui/BlocksFeatureProvider';
import { useI18nFeature } from '../../../i18n/context';
import { i18nInitialProps } from '../../../i18n/utils';
import EpochsSearchResult from '../../../search/ui/EpochsSearchResult';
import styles from './EpochPage.module.scss';

export const EpochPage = () => (
  <div className={styles.epochLayout}>
    <BlocksFeatureProvider>
      <EpochsSearchResult />
    </BlocksFeatureProvider>
  </div>
);

const StaticLayout = (props: StaticLayoutProps) => {
  const { translate } = useI18nFeature().store;
  return (
    <>
      <Head>
        <title>{translate('epoch.pageTitle')}</title>
      </Head>
      <ShrinkedHeaderLayout>{props.children}</ShrinkedHeaderLayout>
    </>
  );
};

EpochPage.getStaticLayout = () => StaticLayout;
EpochPage.getInitialProps = i18nInitialProps;
