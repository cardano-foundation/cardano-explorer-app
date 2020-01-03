import Head from 'next/head';
import React from 'react';
import { AddressSearchResult } from '../features/search/ui/AddressSearchResult';
import { TransactionsFeatureProvider } from '../features/transactions/components/TransactionsFeatureProvider';
import { ShrinkedHeaderLayout } from '../widgets/layout/ShrinkedHeaderLayout';

const AddressPage = () => (
  <TransactionsFeatureProvider>
    <Head>
      <title>Cardano Explorer | Address</title>
    </Head>
    <AddressSearchResult />
  </TransactionsFeatureProvider>
);

AddressPage.getStaticLayout = ShrinkedHeaderLayout;

export default AddressPage;
