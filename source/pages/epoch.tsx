import debug from 'debug';
import React from 'react';
import NoSSR from 'react-no-ssr';
import { environment } from '../environment';

if (environment.DEBUG) {
  debug.enable(environment.DEBUG);
}

// Render empty on server
let EpochPage = () => <NoSSR />;

if (environment.IS_CLIENT) {
  // tslint:disable-next-line:no-var-requires
  const Layout = require('../layout/Layout').default;
  // tslint:disable-next-line:no-var-requires
  const HeaderContainer = require('../features/shared/header/containers/HeaderContainer')
    .default;
  // tslint:disable-next-line:no-var-requires
  const FooterContainer = require('../features/shared/footer/containers/FooterContainer')
    .default;

  EpochPage = () => (
    <NoSSR>
      <Layout>
        <HeaderContainer />
        <FooterContainer />
      </Layout>
    </NoSSR>
  );
}

export default EpochPage;
