import { useRouter } from 'next/router';
import React from 'react';
import { BrandType } from '../../../constants';
import Search from '../components/Search';

export interface ISearchBarProps {
  brandType?: BrandType;
}

export const SearchBar = (props: ISearchBarProps) => {
  const router = useRouter();

  const openSearchedPage = async (id: string) => {
    let url;
    if (id && id.length > 15) {
      url = 'block?id';
    } else if (id && id.length < 15) {
      url = 'block?number';
    } else if (id) {
      url = 'epoch?number';
    } else if (id) {
      url = 'transaction?id';
    }
    if (url) {
      router.push('/' + url + '=' + id);
    } else {
      router.push('/no-search-results');
    }
  };

  return (
    <Search brandType={props.brandType} onSearch={id => openSearchedPage(id)} />
  );
};
