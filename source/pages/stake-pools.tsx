import React from 'react';
import NoSSR from 'react-no-ssr';
import { BrandType } from '../constants';
import EpochSummary from '../features/epochs/ui/EpochSummary';
import StakePoolsContainer from '../features/stake-pools/containers/StakePoolsContainer';
import UnmoderatedDataConsentedContainer from '../features/stake-pools/containers/UnmoderatedDataConsentedContainer';
import Container from '../widgets/container/Container';
import { Footer, Header, Layout } from '../widgets/layout';

const StakePoolsPage = () => (
  <>
    <EpochSummary
      epoch={{
        blocksCount: 21073,
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

StakePoolsPage.getStaticLayout = (page: React.ReactNode) => (
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
    <Container hasTopMargin>{page}</Container>
    <Footer />
  </Layout>
);
StakePoolsPage.pageTitle = 'Cardano Explorer | Stake Pools';

export default StakePoolsPage;
