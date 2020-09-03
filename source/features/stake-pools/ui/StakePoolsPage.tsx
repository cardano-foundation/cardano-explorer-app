import Head from 'next/head';
import React from 'react';
import NoSSR from 'react-no-ssr';
import { StaticLayoutProps } from '../../../lib/types';
import { EnlargedHeaderLayout } from '../../../widgets/layout/EnlargedHeaderLayout';
import { useI18nFeature } from '../../i18n/context';
import { i18nInitialProps } from '../../i18n/utils';
import StakePoolsContainer from '../containers/StakePoolsContainer';
import UnmoderatedDataConsentedContainer from '../containers/UnmoderatedDataConsentedContainer';
import styles from './StakePoolsPage.module.scss';
import { StakePoolStatistics } from './StakePoolStatistics';

export const StakePoolsPage = () => (
  <>
    <div className={styles.epochSummary}>
      <StakePoolStatistics
        numberOfStakePools={841}
        rewardsPreviousEpoch={7170431}
        rewardsTotal={927070538}
        stakeControlledPercentage={76.43}
      />
    </div>
    <StakePoolsContainer />
  </>
);

const StaticLayout = (props: StaticLayoutProps) => {
  const { translate } = useI18nFeature().store;
  return (
    <>
      <Head>
        <title>{translate('stakePools.pageTitle')}</title>
      </Head>
      <NoSSR>
        <UnmoderatedDataConsentedContainer />
      </NoSSR>
      <EnlargedHeaderLayout>{props.children}</EnlargedHeaderLayout>
    </>
  );
};

StakePoolsPage.getStaticLayout = () => StaticLayout;
StakePoolsPage.getInitialProps = i18nInitialProps;
