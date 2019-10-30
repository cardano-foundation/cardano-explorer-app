import { Observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useBlocksFeature } from '../index';
import BlockList from './BlockList';

export const LatestBlocks = () => {
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
