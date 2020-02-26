import { Address } from 'cardano-js';
import { AddressGroup } from 'cardano-js/dist/Address/AddressGroup';
import { ChainSettings } from 'cardano-js/dist/ChainSettings';
import React from 'react';
import { useState } from 'react';
import {
  BrandType,
  CardanoEra,
  CardanoNetwork,
  SearchType,
} from '../../../constants';
import { environment } from '../../../environment';
import { useNetworkInfoFeature } from '../../network-info/context';
import { useSearchFeature } from '../context';
import Search from './Search';
import SearchSuggestions from './SearchSuggestions';

export interface ISearchBarProps {
  brandType?: BrandType;
}

export const SearchBar = (props: ISearchBarProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState('');
  const search = useSearchFeature();
  const networkInfo = useNetworkInfoFeature().store;
  const introspectQuery = (query: string) => {
    const chainSettings =
      environment.CARDANO.NETWORK === CardanoNetwork.MAINNET
        ? ChainSettings.mainnet
        : ChainSettings.testnet;
    // Assuming the AddressGroup.jormungandr is the format for Shelley addresses
    // Will update when final decision is made.
    const addressGroup =
      environment.CARDANO.ERA === CardanoEra.BYRON
        ? AddressGroup.byron
        : AddressGroup.jormungandr;
    if (Address.Util.isAddress(query, chainSettings, addressGroup)) {
      search.actions.addressSearchRequested.trigger({
        address: query,
      });
    } else if (query?.length === 64) {
      search.actions.idSearchRequested.trigger({ id: query });
    } else if (/^\d+$/.test(query)) {
      const searchNumber = parseInt(query, 10);
      if (
        searchNumber > networkInfo.currentEpoch &&
        searchNumber > networkInfo.blockHeight
      ) {
        search.actions.unknownSearchRequested.trigger({ query });
      } else {
        if (searchType === SearchType.EPOCH) {
          search.actions.epochNumberSearchRequested.trigger({
            number: searchNumber,
          });
        } else if (searchType === SearchType.BLOCK) {
          search.actions.blockNumberSearchRequested.trigger({
            number: searchNumber,
          });
        }
      }
    } else {
      search.actions.unknownSearchRequested.trigger({ query });
    }
  };

  const searchTypeSelectQuery = (value: string) => {
    setSearchType(value);
    setSearchValue('');
  };

  const removeSearchType = () => {
    setSearchType('');
    setSearchValue('');
  };

  const isSearchValueValid = searchValue && searchValue.length < 10;

  return (
    <>
      <Search
        brandType={props.brandType}
        onInputChange={query => setSearchValue(query)}
        onSearch={query => introspectQuery(query)}
        onRemoveSearchType={removeSearchType}
        searchType={searchType}
      />
      {isSearchValueValid && (
        <SearchSuggestions
          value={searchValue}
          onSearchTypeSelect={value => searchTypeSelectQuery(value)}
        />
      )}
    </>
  );
};
