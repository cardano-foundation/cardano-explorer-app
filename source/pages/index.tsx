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
  const Layout = require('../layout/Layout').default;
  const HeaderContainer = require('../features/shared/header/containers/HeaderContainer')
    .default;
  const SearchContainer = require('../features/shared/search/containers/SearchContainer')
    .default;
  const EpochContainer = require('../features/main/epoch/containers/EpochContainer')
    .default;
  const EpochsContainer = require('../features/main/epochs/containers/EpochsContainer')
    .default;
  const BlocksContainer = require('../features/main/blocks/containers/BlocksContainer')
    .default;
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
