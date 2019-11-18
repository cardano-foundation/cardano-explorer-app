import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import LoadingSpinner from '../../../widgets/loading-spinner/LoadingSpinner';

import Pagination from '../../../widgets/pagination/Pagination';
import { useNetworkInfoFeature } from '../../network-info/context';
import { useBlocksFeature } from '../context';
import BlockList from './BlockList';
import styles from './BlocksBrowser.scss';

const BLOCKS_PER_PAGE_DEFAULT = 10;
const BLOCKS_PER_PAGE_MINIMUM = 5;
const BLOCKS_PER_PAGE_MAXIMUM = 30;

type BrowseBlocksQueryParams = {
  lower: number;
  upper: number;
};

const calculateBrowseBlocksQueryParams = (
  blockHeight: number,
  query?: { [key: string]: string | string[] }
): BrowseBlocksQueryParams => {
  const isLowerParamGiven = query?.lower !== undefined;
  const isUpperParamGiven = query?.upper !== undefined;
  const isNoParamsGiven = !isLowerParamGiven && !isUpperParamGiven;
  const isOnlyLowerGiven = isLowerParamGiven && !isUpperParamGiven;
  const isOnlyUpperGiven = isUpperParamGiven && !isLowerParamGiven;
  let lower = isLowerParamGiven ? parseInt(query?.lower as string, 10) : 0;
  let upper = isUpperParamGiven
    ? parseInt(query?.upper as string, 10)
    : blockHeight;
  if (isOnlyLowerGiven) {
    upper = lower + BLOCKS_PER_PAGE_DEFAULT;
  } else if (isOnlyUpperGiven || isNoParamsGiven) {
    lower = upper - BLOCKS_PER_PAGE_DEFAULT;
  }
  if (upper > blockHeight) {
    upper = blockHeight;
  }
  if (lower < 0) {
    lower = 0;
  } else if (lower > upper - BLOCKS_PER_PAGE_MINIMUM) {
    lower = upper - BLOCKS_PER_PAGE_MINIMUM;
  } else if (upper - lower > BLOCKS_PER_PAGE_MAXIMUM) {
    lower = upper - BLOCKS_PER_PAGE_MAXIMUM;
  }
  return { lower, upper };
};

const createBrowsePath = ({ lower, upper }: BrowseBlocksQueryParams) =>
  `/browse-blocks?lower=${lower}&upper=${upper}`;

const BlocksBrowser = () => {
  // The network block height is required before doing any browsing
  const networkInfo = useNetworkInfoFeature();
  const blocks = useBlocksFeature();
  const router = useRouter();
  const { blockHeight } = networkInfo.store;
  const isReadyToQuery = !!blockHeight;
  let content = <LoadingSpinner />;
  let isCorrectPath = false;
  let browseParams: BrowseBlocksQueryParams | null = null;
  let itemsPerPage = BLOCKS_PER_PAGE_DEFAULT;
  let currentPage = 0;
  let totalPages = 0;

  if (blockHeight) {
    // Process given params
    browseParams = calculateBrowseBlocksQueryParams(blockHeight, router.query);
    isCorrectPath =
      browseParams.lower.toString() === router.query?.lower &&
      browseParams.upper.toString() === router.query?.upper;
    itemsPerPage = browseParams.upper - browseParams.lower;
    totalPages = Math.floor(blockHeight / itemsPerPage);
    currentPage = Math.floor(browseParams.upper / itemsPerPage);
  }

  useEffect(() => {
    if (!isReadyToQuery || !browseParams) {
      return;
    }
    if (!isCorrectPath) {
      // Redirect to correct query params if necessary
      const correctedBrowsePath = createBrowsePath(browseParams);
      router.push(correctedBrowsePath);
    } else {
      // If params are correct, trigger search
      blocks.actions.browseBlocks.trigger(browseParams);
    }
  }, [isReadyToQuery, router.query?.lower, router.query?.upper]);

  if (
    blockHeight &&
    !blocks.api.getBlocksInRangeQuery.isExecutingTheFirstTime
  ) {
    content = (
      <>
        <BlockList
          isLoading={blocks.api.getBlocksInRangeQuery.isExecuting}
          title="Browse Blocks"
          items={blocks.store.browsedBlocks}
        />
        <Pagination
          currentPage={currentPage}
          onChangePage={(page: number) => {
            if (page > 0 && page <= totalPages) {
              const upper = Math.min(page * itemsPerPage, blockHeight);
              router.push(
                createBrowsePath({
                  lower: upper - itemsPerPage,
                  upper,
                })
              );
            }
          }}
          totalPages={totalPages}
        />
      </>
    );
  }

  return <div className={styles.root}>{content}</div>;
};

export default observer(BlocksBrowser);
