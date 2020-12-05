import { isString } from 'lodash';
import { Observer } from 'mobx-react-lite';
import React from 'react';
import { useObservableEffect } from '../../../lib/mobx/react';
import LoadingSpinner from '../../../widgets/loading-spinner/LoadingSpinner';
import { useI18nFeature } from '../../i18n/context';
import { useNavigationFeature } from '../../navigation';
import { useNetworkInfoFeature } from '../../network-info/context';
import UnmoderatedDataWarning from '../../stake-pools/components/UnmoderatedDataWarning';
import TransactionInfo from '../../transactions/components/TransactionInfo';
import { useTransactionsFeature } from '../../transactions/context';
import { useSearchFeature } from '../context';
import { SearchType } from '../store';
import NoSearchResult from './NoSearchResult';
import styles from './TransactionSearchResult.module.scss';

export const TransactionSearchResult = () => {
  const { translate } = useI18nFeature().store;
  const search = useSearchFeature();
  const networkInfo = useNetworkInfoFeature();
  const transactions = useTransactionsFeature();
  const { store, actions } = transactions;
  const { handleAcceptUnmoderatedData } = actions;
  const navigation = useNavigationFeature();

  useObservableEffect(() => {
    const { query } = navigation.store;
    const { id } = query;
    if (isString(id)) {
      search.actions.searchById.trigger({ id });
    }
  });

  return (
    <Observer>
      {() => {
        const { transactionSearchResult } = search.store;
        const { showUnmoderatedData } = transactions.store;
        if (
          !search.api.searchByIdQuery.hasBeenExecutedAtLeastOnce ||
          search.store.isSearching
        ) {
          return <LoadingSpinner className={styles.loadingSpinnerMargin} />;
        } else if (transactionSearchResult) {
          return (
            <>
              {!showUnmoderatedData &&
              transactionSearchResult.metadata &&
              transactionSearchResult.metadata.length && (
                <UnmoderatedDataWarning
                  type="transactions"
                  onAcceptUnmoderatedData={handleAcceptUnmoderatedData.trigger}
                />
              )}
              <TransactionInfo
                dontLinkToTransaction
                navigation={navigation?.actions}
                networkBlockHeight={networkInfo.store.blockHeight}
                title={translate('transaction.transactionLabel')}
                showDetails
                {...transactionSearchResult}
              />
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
