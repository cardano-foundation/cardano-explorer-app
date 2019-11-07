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
        return (
          <>
            <BlockList
              title="Latest Blocks"
              items={latestBlocks}
              isLoading={store.isLoadingFirstTime}
            />
            {store.isLoadingFirstTime && <LoadingSpinner />}
          </>
        );
      }}
    </Observer>
  );
};
