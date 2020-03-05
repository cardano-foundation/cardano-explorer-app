import { isString } from 'lodash';
import { Observer } from 'mobx-react-lite';
import React from 'react';
import { useObservableEffect } from '../../../lib/mobx/react';
import LoadingSpinner from '../../../widgets/loading-spinner/LoadingSpinner';
import AddressSummary from '../../address/ui/AddressSummary';
import { useI18nFeature } from '../../i18n/context';
import { useNavigationFeature } from '../../navigation';
import TransactionBrowser, {
  TRANSACTIONS_PER_PAGE_DEFAULT,
} from '../../transactions/components/TransactionsBrowser';
import { useTransactionsFeature } from '../../transactions/context';
import { useSearchFeature } from '../context';
import { SearchType } from '../store';
import styles from './AddressSearchResult.module.scss';
import NoSearchResult from './NoSearchResult';

export const AddressSearchResult = () => {
  const { translate } = useI18nFeature().store;
  const { actions, api, store } = useSearchFeature();
  const transactions = useTransactionsFeature();
  const navigation = useNavigationFeature();

  useObservableEffect(() => {
    const { query } = navigation.store;
    const { address } = query;
    if (isString(address)) {
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
          return <LoadingSpinner className={styles.loadingSpinnerMargin} />;
        } else if (addressSearchResult) {
          const {
            address,
            finalBalance,
            transactionsCount,
          } = addressSearchResult;
          return (
            <>
              <div className={styles.addressSummary}>
                <AddressSummary
                  title={translate('address.addressLabel')}
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
                    navigation.actions.push.trigger({
                      path: '/address',
                      query: {
                        address,
                        page,
                        perPage:
                          navigation.store.query.perPage ??
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
                  perPage={navigation.store.query.perPage as string}
                  currentPage={(navigation.store.query.page as string) ?? 1}
                  total={parseInt(transactionsCount, 10)}
                  transactions={transactions.store.browsedAddressTransactions}
                />
              </div>
            </>
          );
        } else {
          return (
            <NoSearchResult
              searchQuery={navigation.store.query.address as string}
              searchType={SearchType.address}
            />
          );
        }
      }}
    </Observer>
  );
};
