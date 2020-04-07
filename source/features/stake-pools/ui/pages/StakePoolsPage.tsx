import Head from 'next/head';
import React from 'react';
import NoSSR from 'react-no-ssr';
import { BrandType } from '../../../../constants';
import { StaticLayoutProps } from '../../../../lib/types';
import Container from '../../../../widgets/container/Container';
import { Footer, Header, Layout } from '../../../../widgets/layout';
import EpochSummary from '../../../epochs/ui/EpochSummary';
import { useI18nFeature } from '../../../i18n/context';
import { i18nInitialProps } from '../../../i18n/utils';
import StakePoolsContainer from '../../containers/StakePoolsContainer';
import UnmoderatedDataConsentedContainer from '../../containers/UnmoderatedDataConsentedContainer';

export const StakePoolsPage = () => (
  <>
    <EpochSummary
      epoch={{
        blocksCount: '21073',
        lastBlockAt: new Date(1569144483000),
        number: 135,
        output: '8397621',
        percentage: 97,
        slotsCount: 21600,
        startedAt: new Date(1568366883000),
        transactionsCount: '12',
      }}
      title="Epoch"
    />
    <StakePoolsContainer />
  </>
);

const StaticLayout = (props: StaticLayoutProps) => {
  const { translate } = useI18nFeature().store;
  return (
    <Layout
      header={
        <>
          <Header brandType={BrandType.SHRINKED} />
          <NoSSR>
            <UnmoderatedDataConsentedContainer />
          </NoSSR>
        </>
      }
    >
      <Head>
        <title>{translate('stakePools.pageTitle')}</title>
      </Head>
      <Container hasTopMargin>{props.children}</Container>
      <Footer />
    </Layout>
  );
};

StakePoolsPage.getStaticLayout = () => StaticLayout;
StakePoolsPage.getInitialProps = i18nInitialProps;
