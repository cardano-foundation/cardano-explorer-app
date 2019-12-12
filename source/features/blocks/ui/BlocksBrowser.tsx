import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { calculatePaging } from '../../../lib/paging';
import LoadingSpinner from '../../../widgets/loading-spinner/LoadingSpinner';

import Pagination from '../../../widgets/browsing/Pagination';
import { useNetworkInfoFeature } from '../../network-info/context';
import { useBlocksFeature } from '../context';
import BlockList from './BlockList';

// TODO: This actually fetches 1 item more than given
// because the query includes lower and upper boundaries
const BLOCKS_PER_PAGE_DEFAULT = 20;
const BLOCKS_PER_PAGE_MAXIMUM = 50;
const BLOCKS_PER_PAGE_MINIMUM = 5;

const BlocksBrowser = () => {
  const router = useRouter();
  // The network block height is required before doing any browsing
  const networkInfo = useNetworkInfoFeature();
  const { blockHeight } = networkInfo.store;
  const isBlockHeightAvailable = !!blockHeight;
  const blocks = useBlocksFeature();
  const isLoadingFirstTime =
    blocks.api.getBlocksInRangeQuery.isExecutingTheFirstTime;

  const paging = calculatePaging({
    currentPage: router.query?.page as string,
    perPage: router.query?.perPage as string,
    perPageDefault: BLOCKS_PER_PAGE_DEFAULT,
    perPageMaximum: BLOCKS_PER_PAGE_MAXIMUM,
    perPageMinimum: BLOCKS_PER_PAGE_MINIMUM,
    totalItems: blockHeight,
  });

  useEffect(() => {
    if (!isBlockHeightAvailable) {
      return;
    }
    blocks.actions.browseBlocks.trigger({
      page: paging.currentPage,
      perPage: paging.itemsPerPage,
    });
  }, [isBlockHeightAvailable, router.query?.page, router.query?.perPage]);

  return isBlockHeightAvailable && !isLoadingFirstTime ? (
    <>
      <BlockList
        isLoading={blocks.api.getBlocksInRangeQuery.isExecuting}
        title="Browse Blocks"
        items={blocks.store.browsedBlocks}
      />
      <Pagination
        currentPage={paging.currentPage}
        onChangePage={(page: number) => {
          router.push({
            pathname: '/browse-blocks',
            query: {
              page,
              perPage: paging.itemsPerPage,
            },
          });
        }}
        totalPages={paging.totalPages}
      />
    </>
  ) : (
    <LoadingSpinner />
  );
};

export default observer(BlocksBrowser);
