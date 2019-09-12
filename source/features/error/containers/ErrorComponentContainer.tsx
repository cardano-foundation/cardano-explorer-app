import { observer } from 'mobx-react-lite';
import React from 'react';
import Error from '../components/Error';
import { useBlocks } from '../hooks';

export const ErrorComponentContainerRaw = () => {
  const { actions, store } = useBlocks();
  return (
    <Error
      searchResult={store.searchedBlock}
      triggerBlockSearch={id => actions.searchBlockById.trigger({ id })}
    />
  );
};

export const ErrorComponentContainer = observer(ErrorComponentContainerRaw);
