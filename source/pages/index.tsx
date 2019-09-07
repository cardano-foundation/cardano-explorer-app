import debug from 'debug';
import React from 'react';
import NoSSR from 'react-no-ssr';
import { environment } from '../environment';
import styles from '../Layout/Layout.scss';

if (environment.DEBUG) {
  debug.enable(environment.DEBUG);
}

// Render empty on server
let IndexPage = () => <NoSSR />;

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

  IndexPage = () => (
    <NoSSR>
      <Layout>
        <div className={styles.container}>
          <HeaderContainer />
          <SearchContainer />
          <EpochContainer />
          <EpochsContainer />
          <BlocksContainer />
          <FooterContainer />
        </div>
      </Layout>
    </NoSSR>
  );
}

export default IndexPage;