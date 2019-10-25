import debug from 'debug';
import React from 'react';
import NoSSR from 'react-no-ssr';
import { environment } from '../../environment';
import { Footer, Header, Layout } from '../../layout';

if (environment.DEBUG) {
  debug.enable(environment.DEBUG);
}

export const TransactionPage = () => (
  <NoSSR>
    <Layout>
      <Header />
      <Footer />
    </Layout>
  </NoSSR>
);
