import { debounce } from 'lodash';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useObservableEffect } from '../../../lib/mobx/react';
import { calculatePaging, ICalculatePagingOutputs } from '../../../lib/paging';
import NavigationPagination from '../../../widgets/browsing/NavigationPagination';
import LoadingSpinner from '../../../widgets/loading-spinner/LoadingSpinner';
import { useNavigationFeature } from '../../navigation';
import { useNetworkInfoFeature } from '../../network-info/context';
import {
  BLOCKS_PER_PAGE_DEFAULT,
  BLOCKS_PER_PAGE_MAXIMUM,
  BLOCKS_PER_PAGE_MINIMUM,
} from '../config';
import { useBlocksFeature } from '../context';
import { IBlocksFeature } from '../index';
import BlockList from './BlockList';
import styles from './BlocksBrowser.module.scss';

interface IBlocksBrowserProps {
  epoch?: number;
  perPageDefault?: number;
  perPageMaximum?: number;
  perPageMinimum?: number;
  title: string;
  totalItems?: number;
}

const triggerBrowseQuery = (
  blocks: IBlocksFeature,
  p: ICalculatePagingOutputs,
  epoch?: number
) => {
  blocks.actions.browseBlocks.trigger({
    epoch,
    page: p.currentPage,
    perPage: p.itemsPerPage,
  });
};

const triggerBrowseQueryDebounced = debounce(triggerBrowseQuery, 400);

const BlocksBrowser = (props: IBlocksBrowserProps) => {
  const networkInfo = useNetworkInfoFeature();
  const navigation = useNavigationFeature();
  const blocks = useBlocksFeature();

  // Check block height or total items
  const { blockHeight } = networkInfo.store;
  const totalItems = props.totalItems ?? blockHeight;
  if (!totalItems) {
    return <LoadingSpinner className={styles.loadingSpinnerMargin} />;
  }
  // Setup rest of dependencies:
  const { browsedBlocks } = blocks.store;
  const isBrowsingInEpoch = !!props.epoch;
  const { page, perPage } = navigation.store.query;

  const apiQuery =
    props.epoch != null
      ? blocks.api.getBlocksInEpochQuery
      : blocks.api.getBlocksInRangeQuery;

  const paging = calculatePaging({
    currentPage: page as string,
    perPage: perPage as string,
    perPageDefault: props.perPageDefault ?? BLOCKS_PER_PAGE_DEFAULT,
    perPageMaximum: props.perPageMaximum ?? BLOCKS_PER_PAGE_MAXIMUM,
    perPageMinimum: props.perPageMinimum ?? BLOCKS_PER_PAGE_MINIMUM,
    totalItems,
  });

  // Always immediately trigger query exactly once after rendering:
  useEffect(() => {
    triggerBrowseQuery(blocks, paging, props.epoch);
  }, []);

  // Debounce query to avoid unnecessary queries on rapid page switching
  useEffect(() => {
    if (apiQuery.hasBeenExecutedAtLeastOnce) {
      triggerBrowseQueryDebounced(blocks, paging, props.epoch);
    }
  }, [paging.totalPages, paging.currentPage, paging.itemsPerPage, props.epoch]);

  // Trigger query on last page whenever total items change
  useEffect(() => {
    if (paging.currentPage === paging.totalPages && !apiQuery.isExecuting) {
      triggerBrowseQuery(blocks, paging, props.epoch);
    }
  }, [totalItems]);

  // Set special state for showing loading spinner on manual browsing
  const [isChangingPage, setIsChangingPage] = useState(false);
  useObservableEffect(() => {
    if (isChangingPage && !apiQuery.isExecuting) {
      setIsChangingPage(false);
    }
  });

  return !apiQuery.hasBeenExecutedAtLeastOnce ||
    apiQuery.isExecutingTheFirstTime ? (
    <LoadingSpinner className={styles.loadingSpinnerMargin} />
  ) : (
    <>
      <BlockList
        title={props.title}
        isLoading={isChangingPage && apiQuery.isExecuting}
        items={
          isBrowsingInEpoch
            ? browsedBlocks.slice()
            : browsedBlocks.slice().reverse()
        }
        ignoreLinksToEpoch={isBrowsingInEpoch}
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

export default observer(BlocksBrowser);
