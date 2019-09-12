import { observer } from 'mobx-react-lite';
import React from 'react';
import Block from '../components/Block';
import { useBlocks } from '../hooks';

export const BlockComponentContainerRaw = () => {
  const { actions, store } = useBlocks();
  return <Block propFirst={''} propSecond={''} />;
};

export const BlockComponentContainer = observer(BlockComponentContainerRaw);
