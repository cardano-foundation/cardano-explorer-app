import React from 'react';
import { AddressSearchResult } from '../features/search/ui/AddressSearchResult';
import { TransactionsFeatureProvider } from '../features/transactions/components/TransactionsFeatureProvider';
import { ShrinkedHeaderLayout } from '../widgets/layout/ShrinkedHeaderLayout';

const AddressPage = () => (
  <TransactionsFeatureProvider>
    <AddressSearchResult />
  </TransactionsFeatureProvider>
);

AddressPage.getStaticLayout = ShrinkedHeaderLayout;
AddressPage.pageTitle = 'Cardano Explorer | Address';

export default AddressPage;
