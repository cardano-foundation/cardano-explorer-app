import { Observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { useFeature } from '../../../lib/react/hooks';
import BlockList from '../components/BlockList';
import { blocksContext, createBlocksFeature, useBlocksFeature } from '../index';
import { IBlocksFeature } from '../index';

const LatestBlocksContainer = () => {
  const { actions, store } = useBlocksFeature();
  useEffect(() => {
    actions.fetchLatestBlocks.trigger();
  });
  return (
    <Observer>
      {() => <BlockList title="Latest Blocks" items={store.latestBlocks} />}
    </Observer>
  );
};

export const LatestBlocks = () => {
  const [blocksFeature] = useState<IBlocksFeature>(createBlocksFeature());
  useFeature(blocksFeature);
  return (
    <blocksContext.Provider value={blocksFeature}>
      <LatestBlocksContainer />
    </blocksContext.Provider>
  );
};
