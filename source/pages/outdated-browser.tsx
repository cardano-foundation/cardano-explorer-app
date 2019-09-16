import debug from 'debug';
import React from 'react';
import NoSSR from 'react-no-ssr';
import { environment } from '../environment';

if (environment.DEBUG) {
  debug.enable(environment.DEBUG);
}

let OutdatedBrowserPage = () => <NoSSR />;

if (environment.IS_CLIENT) {
  const Layout = require('../layout/Layout').default;
  const HeaderContainer = require('../features/shared/header/containers/HeaderContainer')
    .default;
  const FooterContainer = require('../features/shared/footer/containers/FooterContainer')
    .default;

  OutdatedBrowserPage = () => (
    <NoSSR>
      <Layout>
        <HeaderContainer />
        <FooterContainer />
      </Layout>
    </NoSSR>
  );
}

export default OutdatedBrowserPage;
