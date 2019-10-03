import debug from 'debug';
import React from 'react';
import NoSSR from 'react-no-ssr';
import { environment } from '../environment';
import EpochInfo from '../features/epochs/components/EpochInfo';

if (environment.DEBUG) {
  debug.enable(environment.DEBUG);
}

let EpochPage = () => <NoSSR />;

if (environment.IS_CLIENT) {
  const Layout = require('../layout/Layout').default;
  const HeaderContainer = require('../features/shared/header/containers/HeaderContainer')
    .default;
  const FooterContainer = require('../features/shared/footer/containers/FooterContainer')
    .default;

  EpochPage = () => (
    <NoSSR>
      <Layout hasContainer>
        <HeaderContainer />
        <EpochInfo
          blocks={21073}
          endedAt={1569144483000}
          epoch={135}
          output={8397621.461829}
          slots={21600}
          startedAt={1568366883000}
          status="In progress..."
          transactions={12}
        />
        <FooterContainer />
      </Layout>
    </NoSSR>
  );
}

export default EpochPage;
