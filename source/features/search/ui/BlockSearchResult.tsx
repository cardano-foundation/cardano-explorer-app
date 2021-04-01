import { isString } from 'lodash';
import { Observer } from 'mobx-react-lite';
import React from 'react';
import { useObservableEffect } from '../../../lib/mobx/react';
import LoadingSpinner from '../../../widgets/loading-spinner/LoadingSpinner';
import { BLOCK_SEARCH_RESULT_PATH } from '../../blocks/config';
import BlockSummary from '../../blocks/ui/BlockSummary';
import { useI18nFeature } from '../../i18n/context';
import { useNavigationFeature } from '../../navigation';
import { useNetworkInfoFeature } from '../../network-info/context';
import TransactionBrowser, {
  TRANSACTIONS_PER_PAGE_DEFAULT,
} from '../../transactions/components/TransactionsBrowser';
import { useTransactionsFeature } from '../../transactions/context';
import { useSearchFeature } from '../context';
import { SearchType } from '../store';
import styles from './BlockSearchResult.module.scss';
import NoSearchResult from './NoSearchResult';

export const BlockSearchResult = () => {
  const { translate } = useI18nFeature().store;
  const { actions, api, store } = useSearchFeature();
  const networkInfo = useNetworkInfoFeature();
  const transactions = useTransactionsFeature();
  const navigation = useNavigationFeature();

  useObservableEffect(() => {
    const { query } = navigation.store;
    const { id } = query;
    if (isString(id)) {
      actions.searchById.trigger({ id });
    }
  });
  return (
    <Observer>
      {() => {
        const { blockSearchResult } = store;
        if (
          (!api.searchForBlockByNumberQuery.hasBeenExecutedAtLeastOnce &&
            !api.searchByIdQuery.hasBeenExecutedAtLeastOnce) ||
          store.isSearching ||
          !networkInfo.store.blockHeight
        ) {
          return <LoadingSpinner className={styles.loadingSpinnerMargin} />;
        } else if (blockSearchResult) {
          return (
            <>
              <BlockSummary
                navigation={navigation?.actions}
                networkBlockHeight={networkInfo.store.blockHeight}
                title={translate('block.summary')}
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
                  onChangePage={(page) => {
                    navigation.actions.push.trigger({
                      path: BLOCK_SEARCH_RESULT_PATH,
                      query: {
                        id: blockSearchResult.id,
                        page,
                        perPage:
                          navigation.store.query.perPage ??
                          TRANSACTIONS_PER_PAGE_DEFAULT,
                      },
                    });
                  }}
                  onPagingCalculated={(paging) => {
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
