import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {
  BrowseInRange,
  IBrowseInRangeBounds,
  IBrowseInRangeResult,
} from '../../../widgets/browsing/BrowseInRange';
import LoadingSpinner from '../../../widgets/loading-spinner/LoadingSpinner';

import Pagination from '../../../widgets/browsing/Pagination';
import { useNetworkInfoFeature } from '../../network-info/context';
import { useEpochsFeature } from '../context';
import EpochList from './EpochList';

const EPOCHS_PER_PAGE_DEFAULT = 10;
const EPOCHS_PER_PAGE_MINIMUM = 5;
const EPOCHS_PER_PAGE_MAXIMUM = 30;

const createBrowsePath = ({ lower, upper }: IBrowseInRangeBounds) =>
  `/browse-epochs?lower=${lower}&upper=${upper}`;

const EpochsBrowser = () => {
  const router = useRouter();
  // The network block height is required before doing any browsing
  const networkInfo = useNetworkInfoFeature();
  const { currentEpoch } = networkInfo.store;
  const isCurrentEpochAvailable = !!currentEpoch;
  const epochs = useEpochsFeature();

  const [
    browseParams,
    setBrowserParams,
  ] = useState<IBrowseInRangeResult | null>(null);
  const isLoadingFirstTime =
    epochs.api.getEpochsInRangeQuery.isExecutingTheFirstTime;

  return (
    <div>
      {isCurrentEpochAvailable ? (
        <>
          <BrowseInRange
            onReadyToBrowse={params => {
              epochs.actions.browseEpochs.trigger(params.bounds);
              setBrowserParams(params);
            }}
            onQueryParamsUpdateRequired={bounds => {
              router.push(createBrowsePath(bounds));
            }}
            perPageDefault={EPOCHS_PER_PAGE_DEFAULT}
            perPageMinimum={EPOCHS_PER_PAGE_MINIMUM}
            perPageMaximum={EPOCHS_PER_PAGE_MAXIMUM}
            userParamLower={router.query?.lower as string}
            userParamUpper={router.query?.upper as string}
            total={currentEpoch}
          />
          {browseParams && !isLoadingFirstTime ? (
            <>
              <EpochList
                isLoading={epochs.api.getEpochsInRangeQuery.isExecuting}
                title="Browse Epochs"
                items={epochs.store.browsedEpochs}
              />
              <Pagination
                currentPage={browseParams.currentPage}
                onChangePage={(page: number) => {
                  if (page > 0 && page <= browseParams.totalPages) {
                    const upper = Math.min(
                      page * browseParams.itemsPerPage,
                      currentEpoch
                    );
                    router.push(
                      createBrowsePath({
                        lower: upper - browseParams.itemsPerPage,
                        upper,
                      })
                    );
                  }
                }}
                totalPages={browseParams.totalPages}
              />
            </>
          ) : (
            <LoadingSpinner />
          )}
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default observer(EpochsBrowser);
