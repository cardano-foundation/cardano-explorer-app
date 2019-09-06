import { observer } from 'mobx-react-lite';
import React from 'react';
import SearchForm from '../components/SearchForm';
import { useBlocks } from '../hooks';

export const SearchFormContainerRaw = () => {
  const { actions, store } = useBlocks();
  return (
    <SearchForm
      searchResult={store.searchedBlock}
      triggerBlockSearch={id => actions.searchBlockById.trigger({ id })}
    />
  );
};

export const SearchFormContainer = observer(SearchFormContainerRaw);
