import debug from 'debug';
import React from 'react';
import NoSSR from 'react-no-ssr';
import { environment } from '../environment';
import styles from '../layout/Layout.scss';

if (environment.DEBUG) {
  debug.enable(environment.DEBUG);
}

let IndexPage = () => <NoSSR />;

if (environment.IS_CLIENT) {
  const Layout = require('../layout/Layout').default;
  const HeaderContainer = require('../features/shared/header/containers/HeaderContainer')
    .default;
  const FooterContainer = require('../features/shared/footer/containers/FooterContainer')
    .default;

  IndexPage = () => (
    <NoSSR>
      <Layout hasContainer>
        <div className={styles.container}>
          <HeaderContainer />
          <FooterContainer />
        </div>
      </Layout>
    </NoSSR>
  );
}

export default IndexPage;
