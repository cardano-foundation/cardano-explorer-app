import React from 'react';
import NoSSR from 'react-no-ssr';
import { environment } from '../environment';
import { Footer, Header, Layout } from '../widgets/layout';

let TransactionPage = () => <NoSSR />;
if (environment.IS_CLIENT) {
  TransactionPage = () => (
    <NoSSR>
      <Layout>
        <Header />
        <Footer />
      </Layout>
    </NoSSR>
  );
}

export default TransactionPage;
