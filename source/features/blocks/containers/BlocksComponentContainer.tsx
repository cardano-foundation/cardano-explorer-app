import { observer } from 'mobx-react-lite';
import React from 'react';
import BlockList from '../components/BlockList';

export const BlocksComponentContainerRaw = () => {
  return <BlockList title="Blocks" items={[]} />;
};

export const BlocksComponentContainer = observer(BlocksComponentContainerRaw);
