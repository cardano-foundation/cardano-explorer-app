import { observer } from 'mobx-react-lite';
import React from 'react';
import Blocks from '../components/Blocks';
import { useBlocks } from '../hooks';

export const BlocksComponentContainerRaw = () => {
  const { actions, store } = useBlocks();
  return <Blocks items={[]} />;
};

export const BlocksComponentContainer = observer(BlocksComponentContainerRaw);
