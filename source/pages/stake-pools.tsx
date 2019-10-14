import debug from 'debug';
import React from 'react';
import NoSSR from 'react-no-ssr';
import { environment } from '../environment';
import EpochSummary from '../features/epochs/components/EpochSummary';
import StakePoolsContainer from '../features/stake-pools/containers/StakePoolsContainer';

if (environment.DEBUG) {
  debug.enable(environment.DEBUG);
}

let EpochPage = () => <NoSSR />;

if (environment.IS_CLIENT) {
  const Layout = require('../layout/Layout').default;
  const HeaderContainer = require('../features/widgets/header/containers/HeaderContainer')
    .default;
  const FooterContainer = require('../features/widgets/footer/containers/FooterContainer')
    .default;

  EpochPage = () => (
    <NoSSR>
      <Layout hasContainer>
        <HeaderContainer />
        <EpochSummary
          blocks={21073}
          endedAt={1569144483000}
          epoch={135}
          output={8397621.461829}
          slots={21600}
          startedAt={1568366883000}
          status="In progress..."
          title="Epoch"
          transactions={12}
        />
        <StakePoolsContainer />
        <FooterContainer />
      </Layout>
    </NoSSR>
  );
}

export default EpochPage;
