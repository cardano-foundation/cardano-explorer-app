import { Observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import LoadingSpinner from '../../../widgets/loading-spinner/LoadingSpinner';
import { useNavigationFeatureOptionally } from '../../navigation';
import { useNetworkInfoFeature } from '../../network-info/context';
import TransactionInfo from '../../transactions/components/TransactionInfo';
import TransactionSummary from '../../transactions/components/TransactionSummary';
import { useSearchFeature } from '../context';
import { SearchType } from '../store';
import NoSearchResult from './NoSearchResult';
import styles from './TransactionSearchResult.scss';

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
      search.actions.searchById.trigger({ id });
    }
  });

  return (
    <Observer>
      {() => {
        const { transactionSearchResult } = search.store;
        if (
          !search.api.searchByIdQuery.hasBeenExecutedAtLeastOnce ||
          search.store.isSearching
        ) {
          return <LoadingSpinner />;
        } else if (transactionSearchResult) {
          return (
            <>
              <TransactionSummary
                navigation={navigation?.actions}
                networkBlockHeight={networkInfo.store.blockHeight}
                title="Summary"
                {...transactionSearchResult}
              />
              <div className={styles.transaction}>
                <TransactionInfo
                  navigation={navigation?.actions}
                  title="Transaction"
                  {...transactionSearchResult}
                />
              </div>
            </>
          );
        } else {
          return (
            <NoSearchResult
              searchQuery={router.query?.id as string}
              searchType={SearchType.id}
            />
          );
        }
      }}
    </Observer>
  );
};
