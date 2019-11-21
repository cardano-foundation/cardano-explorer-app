import { Observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Container from '../../../widgets/container/Container';
import LoadingSpinner from '../../../widgets/loading-spinner/LoadingSpinner';
import AddressSummary from '../../address/ui/AddressSummary';
import TransactionList from '../../transactions/components/TransactionList';
import { useSearchFeature } from '../context';
import { SearchType } from '../store';
import styles from './AddressSearchResult.scss';
import NoSearchResult from './NoSearchResult';

export const AddressSearchResult = () => {
  const { actions, api, store } = useSearchFeature();
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
            transactions,
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
              {transactions.length > 0 && (
                <div className={styles.transactionList}>
                  <TransactionList
                    title="Transactions"
                    items={transactions.map(t => ({
                      ...t,
                      highlightAddress: address,
                    }))}
                  />
                </div>
              )}
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
