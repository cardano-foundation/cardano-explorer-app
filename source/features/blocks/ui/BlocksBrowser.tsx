import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useObservableEffect } from '../../../lib/mobx/react';
import { calculatePaging } from '../../../lib/paging';
import RouterPagination from '../../../widgets/browsing/NavigationPagination';
import LoadingSpinner from '../../../widgets/loading-spinner/LoadingSpinner';
import { useNavigationFeature } from '../../navigation';
import { useNetworkInfoFeature } from '../../network-info/context';
import {
  BLOCKS_PER_PAGE_DEFAULT,
  BLOCKS_PER_PAGE_MAXIMUM,
  BLOCKS_PER_PAGE_MINIMUM,
} from '../config';
import { useBlocksFeature } from '../context';
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

const BlocksBrowser = (props: IBlocksBrowserProps) => {
  const navigation = useNavigationFeature();
  const networkInfo = useNetworkInfoFeature();
  const blocks = useBlocksFeature();
  const { browsedBlocks } = blocks.store;
  const isBrowsingInEpoch = !!props.epoch;

  const apiQuery =
    props.epoch != null
      ? blocks.api.getBlocksInEpochQuery
      : blocks.api.getBlocksInRangeQuery;

  const [paging, setPaging] = useState({
    currentPage: 0,
    itemsPerPage: 0,
    totalPages: 0,
  });

  useObservableEffect(
    observedProps => {
      const { blockHeight } = networkInfo.store;
      const totalItems = observedProps?.totalItems ?? blockHeight;
      if (!totalItems) {
        return;
      }
      const p = calculatePaging({
        currentPage: navigation.store.query.page as string,
        perPage: navigation.store.query.perPage as string,
        perPageDefault: props.perPageDefault ?? BLOCKS_PER_PAGE_DEFAULT,
        perPageMaximum: props.perPageMaximum ?? BLOCKS_PER_PAGE_MAXIMUM,
        perPageMinimum: props.perPageMinimum ?? BLOCKS_PER_PAGE_MINIMUM,
        totalItems,
      });
      setPaging(p);
      blocks.actions.browseBlocks.trigger({
        epoch: props.epoch,
        page: p.currentPage,
        perPage: p.itemsPerPage,
      });
    },
    {
      totalItems: props.totalItems,
    }
  );

  return !apiQuery.hasBeenExecutedAtLeastOnce ||
    apiQuery.isExecutingTheFirstTime ? (
    <LoadingSpinner className={styles.loadingSpinnerMargin} />
  ) : (
    <>
      <BlockList
        title={props.title}
        items={
          isBrowsingInEpoch
            ? browsedBlocks.slice().reverse()
            : browsedBlocks.slice()
        }
      />
      <RouterPagination
        currentPage={paging.currentPage}
        itemsPerPage={paging.itemsPerPage}
        totalPages={paging.totalPages}
      />
    </>
  );
};

export default observer(BlocksBrowser);
