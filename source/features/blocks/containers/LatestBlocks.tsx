import { Observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import BlockList from '../components/BlockList';
import { blocksContext } from '../contexts';
import { useBlocks } from '../hooks';
import { blocksContextDefault } from '../index';

const LatestBlocksContainer = () => {
  const { actions, store } = useBlocks();
  useEffect(() => {
    actions.fetchLatestBlocks.trigger();
  });
  return (
    <Observer>
      {() => <BlockList title="Latest Blocks" items={store.latestBlocks} />}
    </Observer>
  );
};

export const LatestBlocks = () => (
  <blocksContext.Provider value={blocksContextDefault}>
    <LatestBlocksContainer />
  </blocksContext.Provider>
);
