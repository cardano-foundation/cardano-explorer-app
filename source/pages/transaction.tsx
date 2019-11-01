import React from 'react';
import NoSSR from 'react-no-ssr';
import { BrandType } from '../constants';
import { environment } from '../environment';
import { Footer, Header, Layout } from '../widgets/layout';

let TransactionPage = () => <NoSSR />;
if (environment.IS_CLIENT) {
  TransactionPage = () => (
    <NoSSR>
      <Layout>
        <Header brandType={BrandType.SHRINKED} />
        <Footer />
      </Layout>
    </NoSSR>
  );
}

export default TransactionPage;
