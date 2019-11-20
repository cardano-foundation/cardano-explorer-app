import React from 'react';
import NoSSR from 'react-no-ssr';
import { BrandType } from '../constants';
import { environment } from '../environment';
import { AddressSearchResult } from '../features/search/ui/AddressSearchResult';
import { Footer, Header, Layout } from '../widgets/layout';

let AddressPage = () => <NoSSR />;
if (environment.IS_CLIENT) {
  AddressPage = () => (
    <NoSSR>
      <Layout header={<Header brandType={BrandType.SHRINKED} />}>
        <AddressSearchResult />
        <Footer />
      </Layout>
    </NoSSR>
  );
}

export default AddressPage;
