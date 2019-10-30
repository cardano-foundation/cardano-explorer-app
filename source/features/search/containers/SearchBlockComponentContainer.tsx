import { observer } from 'mobx-react-lite';
import React from 'react';
import Search from '../components/Search';
import { useSearchFeature } from '../index';

export const SearchBlockComponentContainerRaw = () => {
  const { actions } = useSearchFeature();
  return <Search onSearch={id => actions.searchForBlockById.trigger({ id })} />;
};

export const SearchBlockComponentContainer = observer(
  SearchBlockComponentContainerRaw
);
