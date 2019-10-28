import { observer } from 'mobx-react-lite';
import React from 'react';
import Search from '../components/Search';
import { useSearch } from '../hooks';

export const SearchBlockComponentContainerRaw = () => {
  const { actions } = useSearch();
  return <Search onSearch={id => actions.searchForBlockById.trigger({ id })} />;
};

export const SearchBlockComponentContainer = observer(
  SearchBlockComponentContainerRaw
);
