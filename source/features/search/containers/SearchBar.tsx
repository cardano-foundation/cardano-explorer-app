import React from 'react';
import { BrandType } from '../../../constants';
import Search from '../components/Search';
import { useSearchFeature } from '../index';

export interface ISearchBarProps {
  brandType?: BrandType;
}

export const SearchBar = (props: ISearchBarProps) => {
  const { actions, api, store } = useSearchFeature();

  const executeSearch = async (id: string) => {
    // actions.searchForBlockById.trigger({id});
    const isExecuting = api.searchForBlockByIdQuery.isExecuting;
    const blockSearchResult = await api.searchForBlockByIdQuery.execute({ id });
    if (blockSearchResult) {
      // @todo
    } else {
      // @todo
    }
  };

  return (
    <Search brandType={props.brandType} onSearch={id => executeSearch(id)} />
  );
};
