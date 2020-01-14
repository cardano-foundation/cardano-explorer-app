import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { calculatePaging } from '../../../lib/paging';
import RouterPagination from '../../../widgets/browsing/RouterPagination';
import LoadingSpinner from '../../../widgets/loading-spinner/LoadingSpinner';

import { useNetworkInfoFeature } from '../../network-info/context';
import { useBlocksFeature } from '../context';
import BlockList from './BlockList';

const BLOCKS_PER_PAGE_DEFAULT = 20;
const BLOCKS_PER_PAGE_MAXIMUM = 50;
const BLOCKS_PER_PAGE_MINIMUM = 5;

interface IBlocksBrowserProps {
  epoch?: number;
  perPageDefault?: number;
  perPageMaximum?: number;
  perPageMinimum?: number;
  title: string;
  totalItems?: number;
}

const BlocksBrowser = (props: IBlocksBrowserProps) => {
  const router = useRouter();
  // The network block height is required before doing any browsing
  const networkInfo = useNetworkInfoFeature();
  const { blockHeight } = networkInfo.store;
  const isBlockHeightAvailable = !!blockHeight;
  const blocks = useBlocksFeature();

  const query =
    props.epoch != null
      ? blocks.api.getBlocksInEpochQuery
      : blocks.api.getBlocksInRangeQuery;

  const paging = calculatePaging({
    currentPage: router.query?.page as string,
    perPage: router.query?.perPage as string,
    perPageDefault: props.perPageDefault ?? BLOCKS_PER_PAGE_DEFAULT,
    perPageMaximum: props.perPageMaximum ?? BLOCKS_PER_PAGE_MAXIMUM,
    perPageMinimum: props.perPageMinimum ?? BLOCKS_PER_PAGE_MINIMUM,
    totalItems: props.totalItems ?? blockHeight,
  });

  useEffect(() => {
    if (!isBlockHeightAvailable) {
      return;
    }
    blocks.actions.browseBlocks.trigger({
      epoch: props.epoch,
      page: paging.currentPage,
      perPage: paging.itemsPerPage,
    });
  }, [
    isBlockHeightAvailable,
    props.totalItems,
    router.query?.page,
    router.query?.perPage,
  ]);

  return isBlockHeightAvailable && !query.isExecutingTheFirstTime ? (
    <>
      <BlockList
        isLoading={query.isExecuting}
        title={props.title}
        items={blocks.store.browsedBlocks.slice().reverse()}
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

export default observer(BlocksBrowser);
