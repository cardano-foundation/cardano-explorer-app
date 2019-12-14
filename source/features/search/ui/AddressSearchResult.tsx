import { Observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Container from '../../../widgets/container/Container';
import LoadingSpinner from '../../../widgets/loading-spinner/LoadingSpinner';
import AddressSummary from '../../address/ui/AddressSummary';
import TransactionBrowser, {
  TRANSACTIONS_PER_PAGE_DEFAULT,
} from '../../transactions/components/TransactionsBrowser';
import { useTransactionsFeature } from '../../transactions/context';
import { useSearchFeature } from '../context';
import { SearchType } from '../store';
import styles from './AddressSearchResult.scss';
import NoSearchResult from './NoSearchResult';

export const AddressSearchResult = () => {
  const { actions, api, store } = useSearchFeature();
  const transactions = useTransactionsFeature();
  const router = useRouter();

  // Trigger search after component did render
  useEffect(() => {
    const { query } = router;
    if (query?.address) {
      const address = query.address as string;
      actions.searchForAddress.trigger({ address });
    }
  });
  return (
    <Observer>
      {() => {
        const { addressSearchResult } = store;
        if (
          !api.searchForAddressQuery.hasBeenExecutedAtLeastOnce ||
          store.isSearching
        ) {
          return <LoadingSpinner />;
        } else if (addressSearchResult) {
          const {
            address,
            finalBalance,
            transactionsCount,
          } = addressSearchResult;
          return (
            <Container>
              <div className={styles.addressSummary}>
                <AddressSummary
                  title="Address"
                  address={address}
                  finalBalance={finalBalance}
                  transactionsCount={transactionsCount}
                />
              </div>
              <div className={styles.transactionList}>
                <TransactionBrowser
                  isLoading={
                    transactions.api.getAddressTransactionsQuery.isExecuting
                  }
                  isLoadingFirstTime={
                    transactions.api.getAddressTransactionsQuery
                      .isExecutingTheFirstTime
                  }
                  onChangePage={page => {
                    router.push({
                      pathname: '/address',
                      query: {
                        address,
                        page,
                        perPage:
                          router.query?.perPage ??
                          TRANSACTIONS_PER_PAGE_DEFAULT,
                      },
                    });
                  }}
                  onPagingCalculated={paging => {
                    transactions.actions.browseAddressTransactions.trigger({
                      address,
                      limit: paging.itemsPerPage,
                      offset: (paging.currentPage - 1) * paging.itemsPerPage,
                    });
                  }}
                  perPage={router.query?.perPage as string}
                  currentPage={(router.query?.page as string) ?? 1}
                  total={parseInt(transactionsCount, 10)}
                  transactions={transactions.store.browsedAddressTransactions}
                />
              </div>
            </Container>
          );
        } else {
          return (
            <NoSearchResult
              searchQuery={router.query?.address as string}
              searchType={SearchType.address}
            />
          );
        }
      }}
    </Observer>
  );
};
