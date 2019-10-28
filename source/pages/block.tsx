import React from 'react';
import NoSSR from 'react-no-ssr';
import { environment } from '../environment';
import { Footer, Header, Layout } from '../widgets/layout';

let BlockPage = () => <NoSSR />;
if (environment.IS_CLIENT) {
  BlockPage = () => (
    <NoSSR>
      <Layout>
        <Header />
        <Footer />
      </Layout>
    </NoSSR>
  );
}

export default BlockPage;
