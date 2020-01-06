import React from 'react';
import { BlockSearchResult } from '../features/search/ui/BlockSearchResult';
import { TransactionsFeatureProvider } from '../features/transactions/components/TransactionsFeatureProvider';
import { ShrinkedHeaderLayout } from '../widgets/layout/ShrinkedHeaderLayout';

const BlockPage = () => (
  <TransactionsFeatureProvider>
    <BlockSearchResult />
  </TransactionsFeatureProvider>
);

BlockPage.getStaticLayout = ShrinkedHeaderLayout;
BlockPage.pageTitle = 'Cardano Explorer | Block';

export default BlockPage;
