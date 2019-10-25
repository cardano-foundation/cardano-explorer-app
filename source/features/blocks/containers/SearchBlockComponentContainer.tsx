import { observer } from 'mobx-react-lite';
import React from 'react';
import Search from '../../widgets/search/components/Search';
import { useBlocks } from '../hooks';

export const SearchBlockComponentContainerRaw = () => {
  const { actions } = useBlocks();
  return <Search onSearch={id => actions.searchBlockById.trigger({ id })} />;
};

export const SearchBlockComponentContainer = observer(
  SearchBlockComponentContainerRaw
);
