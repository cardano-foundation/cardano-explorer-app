import { introspectAddress } from 'cardano-js/js/Address';
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
    let url = '';
    try {
      const { network } = introspectAddress(id);
      if (network) {
        url = 'transaction?id';
      }
    } catch (error) {
      if (error.name !== 'InvalidAddress') {
        if (id && id.length > 15) {
          url = 'block?id';
        } else if (id && id.length < 15) {
          url = 'block?number';
        } else if (id) {
          url = 'epoch?number';
        } else if (id) {
          url = 'transaction?id';
        }
        router.push('/' + (url ? url + '=' + id : 'no-search-results'));
      }
    }
  };

  return (
    <Search brandType={props.brandType} onSearch={id => openSearchedPage(id)} />
  );
};
