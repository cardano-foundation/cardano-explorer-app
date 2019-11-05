import { Observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import LoadingSpinner from '../../../widgets/loading-spinner/LoadingSpinner';
import TransactionSummary from '../../transactions/components/TransactionSummary';
import { useSearchFeature } from '../context';
import NoSearchResult from './NoSearchResult';

export const TransactionSearchResult = () => {
  const { actions, store } = useSearchFeature();
  const router = useRouter();

  // Trigger search after component did render
  useEffect(() => {
    const { query } = router;
    if (query && query.id) {
      const id = query.id as string;
      actions.searchForTransactionById.trigger({ id });
    }
  });

  return (
    <Observer>
      {() => {
        const { transactionSearchResult } = store;
        if (store.isSearching) {
          return <LoadingSpinner />;
        } else if (transactionSearchResult) {
          return (
            <TransactionSummary
              title="Transaction Summary"
              transaction={transactionSearchResult}
            />
          );
        } else {
          return <NoSearchResult />;
        }
      }}
    </Observer>
  );
};
