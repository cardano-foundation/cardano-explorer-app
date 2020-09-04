import Head from 'next/head';
import React from 'react';
import { StaticLayoutProps } from '../../../lib/types';
import { EnlargedHeaderLayout } from '../../../widgets/layout/EnlargedHeaderLayout';
import { useI18nFeature } from '../../i18n/context';
import { i18nInitialProps } from '../../i18n/utils';
import { UnmoderatedDataConsentedContainer } from './consent/UnmoderatedDataConsentedContainer';
import { StakePoolsContainer } from './list/StakePoolsContainer';
import { StakePoolsFeatureProvider } from './StakePoolsFeatureProvider';
import styles from './StakePoolsPage.module.scss';
import { StakePoolsStatistics } from './statistics/StakePoolStatistics';

export const StakePoolsPage = () => (
  <StakePoolsFeatureProvider>
    <UnmoderatedDataConsentedContainer />
    <div className={styles.epochSummary}>
      <StakePoolsStatistics />
    </div>
    <StakePoolsContainer />
  </StakePoolsFeatureProvider>
);

const StaticLayout = (props: StaticLayoutProps) => {
  const { translate } = useI18nFeature().store;
  return (
    <>
      <Head>
        <title>{translate('stakePools.pageTitle')}</title>
      </Head>
      <EnlargedHeaderLayout>{props.children}</EnlargedHeaderLayout>
    </>
  );
};

StakePoolsPage.getStaticLayout = () => StaticLayout;
StakePoolsPage.getInitialProps = i18nInitialProps;
