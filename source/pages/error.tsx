import debug from 'debug';
import React from 'react';
import NoSSR from 'react-no-ssr';
import { environment } from '../environment';

if (environment.DEBUG) {
  debug.enable(environment.DEBUG);
}

// Render empty on server
let ErrorPage = () => <NoSSR />;

if (environment.IS_CLIENT) {
  // tslint:disable-next-line:no-var-requires
  const Layout = require('../layout/Layout').default;
  // tslint:disable-next-line:no-var-requires
  const HeaderContainer = require('../features/shared/header/containers/HeaderContainer')
    .default;
  // tslint:disable-next-line:no-var-requires
  const SearchContainer = require('../features/shared/search/containers/SearchContainer')
    .default;
  // tslint:disable-next-line:no-var-requires
  const EpochContainer = require('../features/main/epoch/containers/EpochContainer')
    .default;
  // tslint:disable-next-line:no-var-requires
  const EpochsContainer = require('../features/main/epochs/containers/EpochsContainer')
    .default;
  // tslint:disable-next-line:no-var-requires
  const BlocksContainer = require('../features/main/blocks/containers/BlocksContainer')
    .default;
  // tslint:disable-next-line:no-var-requires
  const FooterContainer = require('../features/shared/footer/containers/FooterContainer')
    .default;

  ErrorPage = () => (
    <NoSSR>
      <Layout>
        <HeaderContainer />
        <SearchContainer />
        <EpochContainer />
        <EpochsContainer />
        <BlocksContainer />
        <FooterContainer />
      </Layout>
    </NoSSR>
  );
}

export default ErrorPage;
