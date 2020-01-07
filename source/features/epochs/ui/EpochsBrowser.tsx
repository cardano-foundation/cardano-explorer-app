import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { calculatePaging } from '../../../lib/paging';
import RouterPagination from '../../../widgets/browsing/RouterPagination';
import LoadingSpinner from '../../../widgets/loading-spinner/LoadingSpinner';

import { useNetworkInfoFeature } from '../../network-info/context';
import { useEpochsFeature } from '../context';
import EpochList from './EpochList';

const EPOCHS_PER_PAGE_DEFAULT = 10;
const EPOCHS_PER_PAGE_MINIMUM = 5;
const EPOCHS_PER_PAGE_MAXIMUM = 50;

const EpochsBrowser = () => {
  const router = useRouter();
  // The network block height is required before doing any browsing
  const networkInfo = useNetworkInfoFeature();
  const { currentEpoch } = networkInfo.store;
  const isCurrentEpochAvailable = !!currentEpoch;
  const epochs = useEpochsFeature();
  const isLoadingFirstTime =
    epochs.api.getEpochsInRangeQuery.isExecutingTheFirstTime;

  const paging = calculatePaging({
    currentPage: router.query?.page as string,
    perPage: router.query?.perPage as string,
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
  }, [currentEpoch, router.query?.page, router.query?.perPage]);

  return isCurrentEpochAvailable && !isLoadingFirstTime ? (
    <>
      <EpochList
        currentEpoch={epochs.store.currentEpochNumber}
        isLoading={epochs.api.getEpochsInRangeQuery.isExecuting}
        title="Browse Epochs"
        items={epochs.store.browsedEpochs}
      />
      <RouterPagination
        currentPage={paging.currentPage}
        itemsPerPage={paging.itemsPerPage}
        router={router}
        totalPages={paging.totalPages}
      />
    </>
  ) : (
    <LoadingSpinner />
  );
};

export default observer(EpochsBrowser);
