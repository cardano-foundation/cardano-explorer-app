import debug from 'debug';
import React from 'react';
import NoSSR from 'react-no-ssr';
import { environment } from '../environment';

if (environment.DEBUG) {
  debug.enable(environment.DEBUG);
}

// Render empty on server
let IndexPage = () => <NoSSR />;

if (environment.IS_CLIENT) {
  // tslint:disable-next-line:no-var-requires
  const Layout = require('../layout/Layout').default;
  // tslint:disable-next-line:no-var-requires
  const BlocksSearchContainer = require('../features/blocks/containers/BlocksSearchContainer')
    .default;

  IndexPage = () => (
    <NoSSR>
      <Layout>
        <BlocksSearchContainer />
      </Layout>
    </NoSSR>
  );
}

export default IndexPage;
