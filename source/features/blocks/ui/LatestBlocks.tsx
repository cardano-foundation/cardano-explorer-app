import { Observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import LoadingSpinner from '../../../widgets/loading-spinner/LoadingSpinner';
import { useBlocksFeature } from '../index';
import BlockList from './BlockList';

export const LatestBlocks = () => {
  const { actions, store } = useBlocksFeature();
  useEffect(() => {
    actions.fetchLatestBlocks.trigger();
  });
  return (
    <Observer>
      {() => {
        const { latestBlocks } = store;
        return store.isSearching ? (
          <LoadingSpinner />
        ) : (
          <BlockList title="Latest Blocks" items={latestBlocks} />
        );
      }}
    </Observer>
  );
};
