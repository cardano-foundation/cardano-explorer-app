import Head from 'next/head';
import React from 'react';
import { StaticLayoutProps } from '../../lib/types';
import { EnlargedHeaderLayout } from '../../widgets/layout/EnlargedHeaderLayout';
import { BlocksFeatureProvider } from '../blocks/ui/BlocksFeatureProvider';
import { LatestBlocks } from '../blocks/ui/LatestBlocks';
import { EpochsFeatureProvider } from '../epochs/ui/EpochsFeatureProvider';
import { LatestEpochs } from '../epochs/ui/LatestEpochs';
import { useI18nFeature } from '../i18n/context';
import { i18nInitialProps } from '../i18n/utils';
import styles from './LandingPage.module.scss';

export const LandingPage = () => (
  <BlocksFeatureProvider>
    <div className={styles.epochList}>
      <EpochsFeatureProvider>
        <LatestEpochs />
      </EpochsFeatureProvider>
    </div>
    <div className={styles.blockList}>
      <LatestBlocks />
    </div>
  </BlocksFeatureProvider>
);

const StaticLayout = (props: StaticLayoutProps) => {
  const { translate } = useI18nFeature().store;
  return (
    <>
      <Head>
        <title>{translate('index.pageTitle')}</title>
      </Head>
      <EnlargedHeaderLayout>{props.children}</EnlargedHeaderLayout>
    </>
  );
};

LandingPage.getInitialProps = i18nInitialProps;
LandingPage.getStaticLayout = () => StaticLayout;
