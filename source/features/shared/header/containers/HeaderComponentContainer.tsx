import { observer } from 'mobx-react-lite';
import React from 'react';
import Header from '../components/Header';
import { useBlocks } from '../hooks';

export const HeaderComponentContainerRaw = () => {
  const { actions, store } = useBlocks();
  return <Header />;
};

export const HeaderComponentContainer = observer(HeaderComponentContainerRaw);
