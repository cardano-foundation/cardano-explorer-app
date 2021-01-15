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
      if (address.substring(0, 5) === 'stake') {
        actions.searchForStakeAddress.trigger({ address });
      } else {
        actions.searchForPaymentAddress.trigger({ address });
      }
    }
  });
  return (
    <Observer>
      {() => {
        const { paymentAddressSearchResult, stakeAddressSearchResult } = store;
        const address =
          paymentAddressSearchResult?.address ||
          stakeAddressSearchResult?.address ||
          null;
        const transactionsCount =
          paymentAddressSearchResult?.transactionsCount ||
          stakeAddressSearchResult?.transactionsCount;
        if (
          (paymentAddressSearchResult &&
            !api.searchForPaymentAddressQuery.hasBeenExecutedAtLeastOnce) ||
          (stakeAddressSearchResult &&
            !api.searchForStakeAddressQuery.hasBeenExecutedAtLeastOnce) ||
          store.isSearching
        ) {
          return <LoadingSpinner className={styles.loadingSpinnerMargin} />;
        } else if (address !== null && transactionsCount !== null) {
          return (
            <>
              <div className={styles.addressSummary}>
                {paymentAddressSearchResult && (
                  <AddressSummary
                    title={translate('address.addressLabel')}
                    address={paymentAddressSearchResult.address}
                    finalBalance={paymentAddressSearchResult.finalBalance}
                    transactionsCount={
                      paymentAddressSearchResult.transactionsCount
                    }
                    tokensBalance={paymentAddressSearchResult.tokensBalance}
                  />
                )}
                {stakeAddressSearchResult && (
                  <AddressSummary
                    title={translate('address.addressLabel')}
                    address={stakeAddressSearchResult.address}
                    transactionsCount={
                      stakeAddressSearchResult.transactionsCount
                    }
                    totalWithdrawals={stakeAddressSearchResult.totalWithdrawals}
                    totalWithdrawn={stakeAddressSearchResult.totalWithdrawn}
                  />
                )}
              </div>
              <div className={styles.transactionList}>
                {
                  <TransactionBrowser
                    isLoading={
                      transactions.api.getPaymentAddressTransactionsQuery
                        .isExecuting ||
                      transactions.api.getStakeAddressTransactionsQuery
                        .isExecuting
                    }
                    isLoadingFirstTime={
                      transactions.api.getPaymentAddressTransactionsQuery
                        .isExecutingTheFirstTime ||
                      transactions.api.getStakeAddressTransactionsQuery
                        .isExecutingTheFirstTime
                    }
                    onChangePage={(page) => {
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
                    onPagingCalculated={(paging) => {
                      transactions.actions.browseAddressTransactions.trigger({
                        address,
                        limit: paging.itemsPerPage,
                        offset: (paging.currentPage - 1) * paging.itemsPerPage,
                      });
                    }}
                    perPage={navigation.store.query.perPage as string}
                    currentPage={(navigation.store.query.page as string) ?? 1}
                    total={parseInt(
                      paymentAddressSearchResult?.transactionsCount ||
                        stakeAddressSearchResult?.transactionsCount ||
                        '0',
                      10
                    )}
                    transactions={transactions.store.browsedAddressTransactions}
                  />
                }
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
