import { isInteger } from 'lodash';
import React from 'react';
import { BrandType } from '../../../constants';
import { useSearchFeature } from '../context';
import Search from './Search';

export interface ISearchBarProps {
  brandType?: BrandType;
}

export const SearchBar = (props: ISearchBarProps) => {
  const search = useSearchFeature();
  const openSearchedPage = (query: string) => {
    if (query && query.length > 15) {
      search.actions.idSearchRequested.trigger({ id: query });
    } else if (isInteger(parseInt(query, 10))) {
      search.actions.numberSearchRequested.trigger({
        number: parseInt(query, 10),
      });
    } else {
      search.actions.unknownSearchRequested.trigger({ query });
    }
  };

  return (
    <Search brandType={props.brandType} onSearch={id => openSearchedPage(id)} />
  );
};
