import { observer } from 'mobx-react-lite';
import React from 'react';
import Blocks from '../components/Blocks';

export const BlocksComponentContainerRaw = () => {
  return <Blocks items={[]} />;
};

export const BlocksComponentContainer = observer(BlocksComponentContainerRaw);
