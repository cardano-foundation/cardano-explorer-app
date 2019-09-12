import { observer } from 'mobx-react-lite';
import React from 'react';
import Epochs from '../components/Epochs';
import { useBlocks } from '../hooks';

export const EpochsComponentContainerRaw = () => {
  const { actions, store } = useBlocks();
  return (
    <Epochs
      searchResult={store.searchedBlock}
      triggerBlockSearch={id => actions.searchBlockById.trigger({ id })}
    />
  );
};

export const EpochsComponentContainer = observer(EpochsComponentContainerRaw);
