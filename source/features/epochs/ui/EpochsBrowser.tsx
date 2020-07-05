import { debounce } from 'lodash';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useObservableEffect } from '../../../lib/mobx/react';
import { calculatePaging, ICalculatePagingOutputs } from '../../../lib/paging';
import NavigationPagination from '../../../widgets/browsing/NavigationPagination';
import LoadingSpinner from '../../../widgets/loading-spinner/LoadingSpinner';
import { useI18nFeature } from '../../i18n/context';
import { useNavigationFeature } from '../../navigation';
import { useNetworkInfoFeature } from '../../network-info/context';
import {
  EPOCHS_PER_PAGE_DEFAULT,
  EPOCHS_PER_PAGE_MAXIMUM,
  EPOCHS_PER_PAGE_MINIMUM,
} from '../config';
import { useEpochsFeature } from '../context';
import { IEpochsFeature } from '../index';
import EpochList from './EpochList';
import styles from './EpochsBrowser.module.scss';

const triggerBrowseQuery = (
  epochs: IEpochsFeature,
  paging: ICalculatePagingOutputs
) => {
  epochs.actions.browseEpochs.trigger({
    page: paging.currentPage,
    perPage: paging.itemsPerPage,
  });
};

const triggerBrowseQueryDebounced = debounce(triggerBrowseQuery, 400);

const EpochsBrowser = () => {
  const { translate } = useI18nFeature().store;
  const navigation = useNavigationFeature();
  const networkInfo = useNetworkInfoFeature();
  const epochs = useEpochsFeature();

  const { currentEpoch } = networkInfo.store;
  const isCurrentEpochAvailable = !!currentEpoch;
  const epochsQuery = epochs.api.getEpochsInRangeQuery;

  const paging = calculatePaging({
    currentPage: navigation.store.query.page as string,
    perPage: navigation.store.query.perPage as string,
    perPageDefault: EPOCHS_PER_PAGE_DEFAULT,
    perPageMaximum: EPOCHS_PER_PAGE_MAXIMUM,
    perPageMinimum: EPOCHS_PER_PAGE_MINIMUM,
    totalItems: currentEpoch,
  });

  // Browse epochs on page changes
  useEffect(() => {
    if (isCurrentEpochAvailable) {
      // Debounce query to avoid unnecessary queries on rapid page switching
      triggerBrowseQueryDebounced(epochs, paging);
    }
  }, [
    currentEpoch,
    navigation.store.query.page,
    navigation.store.query.perPage,
  ]);

  // Set special state for showing loading spinner on manual browsing
  const [isChangingPage, setIsChangingPage] = useState(false);
  useObservableEffect(() => {
    if (isChangingPage && !epochsQuery.isExecuting) {
      setIsChangingPage(false);
    }
  });

  return !isCurrentEpochAvailable ||
    !epochsQuery.hasBeenExecutedAtLeastOnce ||
    epochsQuery.isExecutingTheFirstTime ? (
    <LoadingSpinner className={styles.loadingSpinnerMargin} />
  ) : (
    <>
      <EpochList
        currentEpoch={epochs.store.currentEpochNumber}
        isLoading={isChangingPage && epochsQuery.isExecuting}
        title={translate('browseEpochs.epochsListTitle')}
        items={epochs.store.browsedEpochs.slice().reverse()}
      />
      <NavigationPagination
        currentPage={paging.currentPage}
        itemsPerPage={paging.itemsPerPage}
        onChangePage={() => setIsChangingPage(true)}
        totalPages={paging.totalPages}
      />
    </>
  );
};

export default observer(EpochsBrowser);
