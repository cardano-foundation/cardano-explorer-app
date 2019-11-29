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
import { useBlocksFeature } from '../context';
import BlockList from './BlockList';

// TODO: This actually fetches 1 item more than given
// because the query includes lower and upper boundaries
const BLOCKS_PER_PAGE_DEFAULT = 20;
const BLOCKS_PER_PAGE_MINIMUM = 5;
const BLOCKS_PER_PAGE_MAXIMUM = 50;

const createBrowsePath = ({ lower, upper }: IBrowseInRangeBounds) =>
  `/browse-blocks?lower=${lower}&upper=${upper}`;

const BlocksBrowser = () => {
  const router = useRouter();
  // The network block height is required before doing any browsing
  const networkInfo = useNetworkInfoFeature();
  const { blockHeight } = networkInfo.store;
  const isBlockHeightAvailable = !!blockHeight;
  const blocks = useBlocksFeature();

  const [
    browseParams,
    setBrowserParams,
  ] = useState<IBrowseInRangeResult | null>(null);
  const isLoadingFirstTime =
    blocks.api.getBlocksInRangeQuery.isExecutingTheFirstTime;

  return (
    <div>
      {isBlockHeightAvailable ? (
        <>
          <BrowseInRange
            onReadyToBrowse={params => {
              blocks.actions.browseBlocks.trigger(params.bounds);
              setBrowserParams(params);
            }}
            perPageDefault={BLOCKS_PER_PAGE_DEFAULT}
            perPageMinimum={BLOCKS_PER_PAGE_MINIMUM}
            perPageMaximum={BLOCKS_PER_PAGE_MAXIMUM}
            userParamLower={router.query?.lower as string}
            userParamUpper={router.query?.upper as string}
            total={blockHeight}
          />
          {browseParams && !isLoadingFirstTime ? (
            <>
              <BlockList
                isLoading={blocks.api.getBlocksInRangeQuery.isExecuting}
                title="Browse Blocks"
                items={blocks.store.browsedBlocks}
              />
              <Pagination
                currentPage={browseParams.currentPage}
                onChangePage={(page: number) => {
                  if (page > 0 && page <= browseParams.totalPages) {
                    const upper = Math.min(
                      page * browseParams.itemsPerPage,
                      blockHeight
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

export default observer(BlocksBrowser);
