import { Observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import LoadingSpinner from '../../../widgets/loading-spinner/LoadingSpinner';
import BlockSummary from '../../blocks/ui/BlockSummary';
import { useNavigationFeatureOptionally } from '../../navigation';
import { useNetworkInfoFeature } from '../../network-info/context';
import TransactionList from '../../transactions/components/TransactionList';
import { useSearchFeature } from '../context';
import { SearchType } from '../store';
import NoSearchResult from './NoSearchResult';

export const BlockSearchResult = () => {
  const { actions, api, store } = useSearchFeature();
  const networkInfo = useNetworkInfoFeature();
  const navigation = useNavigationFeatureOptionally();
  const router = useRouter();

  // Trigger search after component did render
  useEffect(() => {
    const { query } = router;
    if (query?.id) {
      const id = query.id as string;
      actions.searchById.trigger({ id });
    }
  });
  return (
    <Observer>
      {() => {
        const { blockSearchResult } = store;
        if (
          !api.searchByIdQuery.hasBeenExecutedAtLeastOnce ||
          store.isSearching
        ) {
          return <LoadingSpinner />;
        } else if (blockSearchResult) {
          return (
            <>
              <BlockSummary
                navigation={navigation?.actions}
                networkBlockHeight={networkInfo.store.blockHeight}
                title="Block Summary"
                {...blockSearchResult}
              />
              {blockSearchResult.transactionsCount > 0 && (
                <TransactionList
                  items={blockSearchResult.transactions}
                  title="Transactions"
                />
              )}
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
