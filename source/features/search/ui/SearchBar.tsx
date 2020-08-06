import cx from 'classnames';
import { useState } from 'react';
import React from 'react';
import {
  BrandType,
  SearchType,
} from '../../../constants';
import { useI18nFeature } from '../../i18n/context';
import { useNetworkInfoFeature } from '../../network-info/context';
import { useSearchFeature } from '../context';
import Search from './Search';
import styles from './Search.module.scss';
import SearchSuggestions from './SearchSuggestions';

export interface ISearchBarProps {
  brandType?: BrandType;
}

export const SearchBar = (props: ISearchBarProps) => {
  const { translate } = useI18nFeature().store;
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState('');
  const search = useSearchFeature();
  const networkInfo = useNetworkInfoFeature().store;
  const introspectQuery = (query: string, type?: string) => {
    const typeOfSearch = type ? type : searchType;
    if (query?.length === 64) {
      search.actions.idSearchRequested.trigger({ id: query });
    } else if (/^\d+$/.test(query)) {
      const searchNumber = parseInt(query, 10);
      if (
        searchNumber > networkInfo.currentEpoch &&
        searchNumber > networkInfo.blockHeight
      ) {
        search.actions.unknownSearchRequested.trigger({ query });
      } else {
        if (typeOfSearch === SearchType.EPOCH) {
          search.actions.epochNumberSearchRequested.trigger({
            number: searchNumber,
          });
        } else if (typeOfSearch === SearchType.BLOCK) {
          search.actions.blockNumberSearchRequested.trigger({
            number: searchNumber,
          });
        }
      }
    } else {
      search.actions.addressSearchRequested.trigger({
        address: query,
      });
    }
  };

  const searchTypeSelectQuery = (value: string) => {
    setSearchType(value);
    introspectQuery(searchValue, value);
    setSearchValue('');
  };

  const removeSearchType = () => {
    setSearchType('');
    setSearchValue('');
  };

  const isSearchValueValid =
    searchValue && searchValue.length < 10 && !searchType;

  const brandTypeStyle =
    props.brandType === BrandType.SHRINKED
      ? styles.shrinkedSearchSuggestionWrapper
      : '';
  const searchContainerStyles = cx([
    styles.searchSuggestionsWrapper,
    brandTypeStyle,
  ]);

  return (
    <>
      <Search
        brandType={props.brandType}
        onInputChange={(query) => setSearchValue(query.trim())}
        onSearch={(query) => introspectQuery(query.trim())}
        onRemoveSearchType={removeSearchType}
        placeholder={translate('search.placeholder') as string}
        title={translate('search.title') as string}
      />
      {isSearchValueValid && (
        <div className={searchContainerStyles}>
          <SearchSuggestions
            value={searchValue}
            onSearchTypeSelect={(value) => searchTypeSelectQuery(value)}
          />
        </div>
      )}
    </>
  );
};
