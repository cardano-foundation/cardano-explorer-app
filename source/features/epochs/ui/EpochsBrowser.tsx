import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { calculatePaging } from '../../../lib/paging';
import NavigationPagination from '../../../widgets/browsing/NavigationPagination';
import LoadingSpinner from '../../../widgets/loading-spinner/LoadingSpinner';
import { useNavigationFeature } from '../../navigation';

import { useNetworkInfoFeature } from '../../network-info/context';
import {
  EPOCHS_PER_PAGE_DEFAULT,
  EPOCHS_PER_PAGE_MAXIMUM,
  EPOCHS_PER_PAGE_MINIMUM,
} from '../config';
import { useEpochsFeature } from '../context';
import EpochList from './EpochList';

const EpochsBrowser = () => {
  const navigation = useNavigationFeature();
  // The network block height is required before doing any browsing
  const networkInfo = useNetworkInfoFeature();
  const { currentEpoch } = networkInfo.store;
  const isCurrentEpochAvailable = !!currentEpoch;
  const epochs = useEpochsFeature();
  const isLoadingFirstTime =
    epochs.api.getEpochsInRangeQuery.isExecutingTheFirstTime;

  const paging = calculatePaging({
    currentPage: navigation.store.query.page as string,
    perPage: navigation.store.query.perPage as string,
    perPageDefault: EPOCHS_PER_PAGE_DEFAULT,
    perPageMaximum: EPOCHS_PER_PAGE_MAXIMUM,
    perPageMinimum: EPOCHS_PER_PAGE_MINIMUM,
    totalItems: currentEpoch,
  });

  useEffect(() => {
    if (!isCurrentEpochAvailable) {
      return;
    }
    epochs.actions.browseEpochs.trigger({
      page: paging.currentPage,
      perPage: paging.itemsPerPage,
    });
  }, [
    currentEpoch,
    navigation.store.query.page,
    navigation.store.query.perPage,
  ]);

  return isCurrentEpochAvailable && !isLoadingFirstTime ? (
    <>
      <EpochList
        currentEpoch={epochs.store.currentEpochNumber}
        isLoading={epochs.api.getEpochsInRangeQuery.isExecuting}
        title="Browse Epochs"
        items={epochs.store.browsedEpochs}
      />
      <NavigationPagination
        currentPage={paging.currentPage}
        itemsPerPage={paging.itemsPerPage}
        totalPages={paging.totalPages}
      />
    </>
  ) : (
    <LoadingSpinner />
  );
};

export default observer(EpochsBrowser);
