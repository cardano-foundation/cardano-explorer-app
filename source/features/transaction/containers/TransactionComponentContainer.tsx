import { observer } from 'mobx-react-lite';
import React from 'react';
import Transaction from '../components/Transaction';
import { useBlocks } from '../hooks';

export const TransactionComponentContainerRaw = () => {
  const { actions, store } = useBlocks();
  return (
    <Transaction
      searchResult={store.searchedBlock}
      triggerBlockSearch={id => actions.searchBlockById.trigger({ id })}
    />
  );
};

export const TransactionComponentContainer = observer(
  TransactionComponentContainerRaw
);
