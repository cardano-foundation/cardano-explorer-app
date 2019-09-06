import { observer } from 'mobx-react-lite';
import React from 'react';
import BlocksSearch from '../components/BlocksSearchForm';
import { useBlocks } from '../hooks';

export const BlocksSearchFormContainerRaw = () => {
  const { actions, store } = useBlocks();
  return (
    <BlocksSearch
      searchResult={store.searchedBlock}
      triggerBlockSearch={id => actions.searchBlockById.trigger({ id })}
    />
  );
};

export const BlocksSearchFormContainer = observer(BlocksSearchFormContainerRaw);
