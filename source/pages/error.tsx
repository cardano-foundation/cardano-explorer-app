import debug from 'debug';
import React from 'react';
import NoSSR from 'react-no-ssr';
import { environment } from '../environment';

if (environment.DEBUG) {
  debug.enable(environment.DEBUG);
}

let ErrorPage = () => <NoSSR />;

if (environment.IS_CLIENT) {
  const Layout = require('../layout/Layout').default;
  const HeaderContainer = require('../features/widgets/header/containers/HeaderContainer')
    .default;
  const NoSearchResult = require('../features/widgets/search/components/NoSearchResult')
    .default;
  const FooterContainer = require('../features/widgets/footer/containers/FooterContainer')
    .default;

  ErrorPage = () => (
    <NoSSR>
      <Layout>
        <HeaderContainer />
        <NoSearchResult />
        <FooterContainer />
      </Layout>
    </NoSSR>
  );
}

export default ErrorPage;
