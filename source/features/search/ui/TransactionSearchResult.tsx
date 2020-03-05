import { isString } from 'lodash';
import { Observer } from 'mobx-react-lite';
import React from 'react';
import { useObservableEffect } from '../../../lib/mobx/react';
import LoadingSpinner from '../../../widgets/loading-spinner/LoadingSpinner';
import { useI18nFeature } from '../../i18n/context';
import { useNavigationFeature } from '../../navigation';
import { useNetworkInfoFeature } from '../../network-info/context';
import TransactionInfo from '../../transactions/components/TransactionInfo';
import TransactionSummary from '../../transactions/components/TransactionSummary';
import { useSearchFeature } from '../context';
import { SearchType } from '../store';
import NoSearchResult from './NoSearchResult';
import styles from './TransactionSearchResult.module.scss';

export const TransactionSearchResult = () => {
  const { translate } = useI18nFeature().store;
  const search = useSearchFeature();
  const networkInfo = useNetworkInfoFeature();
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
        if (
          !search.api.searchByIdQuery.hasBeenExecutedAtLeastOnce ||
          search.store.isSearching
        ) {
          return <LoadingSpinner className={styles.loadingSpinnerMargin} />;
        } else if (transactionSearchResult) {
          return (
            <>
              <TransactionSummary
                navigation={navigation?.actions}
                networkBlockHeight={networkInfo.store.blockHeight}
                title={translate('transaction.summary')}
                {...transactionSearchResult}
              />
              <div className={styles.transaction}>
                <TransactionInfo
                  dontLinkToTransaction
                  navigation={navigation?.actions}
                  title={translate('transaction.transactionLabel')}
                  {...transactionSearchResult}
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
