import React from 'react';
import NoSSR from 'react-no-ssr';
import { BrandType } from '../constants';
import { environment } from '../environment';
import EpochSummary from '../features/epochs/ui/EpochSummary';
import StakePoolsContainer from '../features/stake-pools/containers/StakePoolsContainer';
import UnmoderatedDataConsentedContainer from '../features/stake-pools/containers/UnmoderatedDataConsentedContainer';
import Container from '../widgets/container/Container';
import { Footer, Header, Layout } from '../widgets/layout';

let StakePoolsPage = () => <NoSSR />;
if (environment.IS_CLIENT) {
  StakePoolsPage = () => (
    <NoSSR>
      <Layout>
        <UnmoderatedDataConsentedContainer />
        <Header brandType={BrandType.SHRINKED} />
        <Container hasTopMargin>
          <EpochSummary
            epoch={{
              blocks: [],
              blocksCount: 21073,
              lastBlockAt: new Date(1569144483000),
              number: 135,
              output: '8397621',
              slotsCount: 21600,
              startedAt: new Date(1568366883000),
              status: 'In progress...',
              transactionsCount: '12',
            }}
            title="Epoch"
          />
        </Container>
        <StakePoolsContainer />
        <Footer />
      </Layout>
    </NoSSR>
  );
}

export default StakePoolsPage;
