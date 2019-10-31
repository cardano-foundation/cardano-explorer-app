import { useRouter } from 'next/router';
import React from 'react';
import { BrandType } from '../../../constants';
import Search from '../components/Search';
import { useSearchFeature } from '../index';

export interface ISearchBarProps {
  brandType?: BrandType;
}

export const SearchBar = (props: ISearchBarProps) => {
  const { actions, api, store } = useSearchFeature();
  const router = useRouter();

  const executeSearch = async (id: string) => {
    actions.searchForBlockById.trigger({ id });
    router.push('/block');
  };

  return (
    <Search brandType={props.brandType} onSearch={id => executeSearch(id)} />
  );
};
