import React from 'react';
import { TransactionSearchResult } from '../features/search/ui/TransactionSearchResult';
import { ShrinkedHeaderLayout } from '../widgets/layout/ShrinkedHeaderLayout';

const TransactionPage = () => <TransactionSearchResult />;

TransactionPage.getStaticLayout = ShrinkedHeaderLayout;
TransactionPage.pageTitle = 'Cardano Explorer | Transaction';

export default TransactionPage;
