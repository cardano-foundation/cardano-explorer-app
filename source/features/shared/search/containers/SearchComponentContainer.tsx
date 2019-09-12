import { observer } from 'mobx-react-lite';
import React from 'react';
import Search from '../components/Search';
import { useBlocks } from '../hooks';

export const SearchComponentContainerRaw = () => {
  const { actions, store } = useBlocks();
  return (
    <Search
      searchResult={store.searchedBlock}
      triggerBlockSearch={id => actions.searchBlockById.trigger({ id })}
    />
  );
};

export const SearchComponentContainer = observer(SearchComponentContainerRaw);
