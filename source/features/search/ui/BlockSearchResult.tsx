import { Observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import LoadingSpinner from '../../../widgets/loading-spinner/LoadingSpinner';
import BlockSummary from '../../blocks/ui/BlockSummary';
import { useNavigationFeature } from '../../navigation';
import { useNetworkInfoFeature } from '../../network-info/context';
import TransactionBrowser, {
  TRANSACTIONS_PER_PAGE_DEFAULT,
} from '../../transactions/components/TransactionsBrowser';
import { useTransactionsFeature } from '../../transactions/context';
import { useSearchFeature } from '../context';
import { SearchType } from '../store';
import styles from './BlockSearchResult.scss';
import NoSearchResult from './NoSearchResult';

export const BlockSearchResult = () => {
  const { actions, api, store } = useSearchFeature();
  const networkInfo = useNetworkInfoFeature();
  const transactions = useTransactionsFeature();
  const navigation = useNavigationFeature();

  // Trigger search after component did render
  useEffect(() => {
    const { query } = navigation.store;
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
          store.isSearching ||
          !networkInfo.store.blockHeight
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
              <div className={styles.transactions}>
                <TransactionBrowser
                  isLoading={
                    transactions.api.getBlockTransactionsQuery.isExecuting
                  }
                  isLoadingFirstTime={
                    transactions.api.getBlockTransactionsQuery
                      .isExecutingTheFirstTime
                  }
                  onChangePage={page => {
                    navigation.actions.push.trigger({
                      path: '/block',
                      query: {
                        id: blockSearchResult.id,
                        page,
                        perPage:
                          navigation.store.query.perPage ??
                          TRANSACTIONS_PER_PAGE_DEFAULT,
                      },
                    });
                  }}
                  onPagingCalculated={paging => {
                    transactions.actions.browseBlocksTransactions.trigger({
                      blockId: blockSearchResult.id,
                      limit: paging.itemsPerPage,
                      offset: (paging.currentPage - 1) * paging.itemsPerPage,
                    });
                  }}
                  perPage={navigation.store.query.perPage as string}
                  currentPage={(navigation.store.query.page as string) ?? 1}
                  total={parseInt(blockSearchResult?.transactionsCount, 10)}
                  transactions={transactions.store.browsedBlockTransactions}
                />
              </div>
            </>
          );
        } else {
          return (
            <NoSearchResult
              searchQuery={navigation.store.query.id as string}
              searchType={SearchType.id}
            />
          );
        }
      }}
    </Observer>
  );
};
