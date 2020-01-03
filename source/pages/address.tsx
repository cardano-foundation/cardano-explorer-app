import Head from 'next/head';
import React from 'react';
import { BrandType } from '../constants';
import { AddressSearchResult } from '../features/search/ui/AddressSearchResult';
import { TransactionsFeatureProvider } from '../features/transactions/components/TransactionsFeatureProvider';
import { Footer, Header, Layout } from '../widgets/layout';

const AddressPage = () => (
  <TransactionsFeatureProvider>
    <AddressSearchResult />
  </TransactionsFeatureProvider>
);

AddressPage.getStaticLayout = (page: React.ReactNode) => (
  <Layout header={<Header brandType={BrandType.SHRINKED} />}>
    <Head>
      <title>Cardano Explorer | Address</title>
    </Head>
    {page}
    <Footer />
  </Layout>
);

export default AddressPage;
