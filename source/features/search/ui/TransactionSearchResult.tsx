import { Observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import LoadingSpinner from '../../../widgets/loading-spinner/LoadingSpinner';
import { useNavigationFeatureOptionally } from '../../navigation';
import { useNetworkInfoFeature } from '../../network-info/context';
import TransactionSummary from '../../transactions/components/TransactionSummary';
import { useSearchFeature } from '../context';
import NoSearchResult from './NoSearchResult';

export const TransactionSearchResult = () => {
  const search = useSearchFeature();
  const networkInfo = useNetworkInfoFeature();
  const navigation = useNavigationFeatureOptionally();
  const router = useRouter();

  // Trigger search after component did render
  useEffect(() => {
    const { query } = router;
    if (query && query.id) {
      const id = query.id as string;
      search.actions.searchForTransactionById.trigger({ id });
    }
  });

  return (
    <Observer>
      {() => {
        const { transactionSearchResult } = search.store;
        if (search.store.isSearching) {
          return <LoadingSpinner />;
        } else if (transactionSearchResult) {
          return (
            <TransactionSummary
              navigation={navigation?.actions}
              networkBlockHeight={networkInfo.store.blockHeight}
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
