import { Observer } from 'mobx-react-lite';
import React from 'react';
import LoadingSpinner from '../../../widgets/loading-spinner/LoadingSpinner';
import { useBlocksFeature } from '../context';
import BlockList from './BlockList';

export const LatestBlocks = () => {
  const { store } = useBlocksFeature();
  return (
    <Observer>
      {() => {
        const { latestBlocks } = store;
        return store.isRefreshing ? (
          <LoadingSpinner />
        ) : (
          <BlockList title="Latest Blocks" items={latestBlocks} />
        );
      }}
    </Observer>
  );
};
