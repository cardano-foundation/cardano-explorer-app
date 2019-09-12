import { observer } from 'mobx-react-lite';
import React from 'react';
import Transaction from '../components/Transaction';
import { useBlocks } from '../hooks';

export const TransactionComponentContainerRaw = () => {
  const { actions, store } = useBlocks();
  return <Transaction propFirst={''} propSecond={''} />;
};

export const TransactionComponentContainer = observer(
  TransactionComponentContainerRaw
);
